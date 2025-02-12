import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailSendDto, EmailResponseDto } from './dtos/email-send.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  /**
   * Méthode de test qui utilise Ethereal.
   * Cette méthode est utile pour le développement et les tests.
   */
  async sendEmailTest(emailSendDto: EmailSendDto): Promise<EmailResponseDto> {
    const { subject, body, recipients } = emailSendDto;
    console.log('[TEST] Début de l’envoi des emails avec les données:', emailSendDto);

    try {
      // Création d'un compte de test Ethereal
      console.log('[TEST] Création d’un compte de test Ethereal...');
      const testAccount = await nodemailer.createTestAccount();
      console.log('[TEST] Compte de test créé:', testAccount);

      // Configuration du transporteur avec les identifiants du compte de test
      const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure, // true pour 465, false pour les autres
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
        tls: {
          rejectUnauthorized: false, // Pour autoriser les certificats auto-signés en test
        },
      });
      console.log('[TEST] Transporteur configuré.');

      // Envoi des emails et récupération des URLs de prévisualisation
      const rawPreviewUrls = await Promise.all(
        recipients.map(async (recipient) => {
          console.log(`[TEST] Envoi de l'email à ${recipient}...`);
          const info = await transporter.sendMail({
            from: `"No-Reply" <${testAccount.user}>`,
            to: recipient,
            subject,
            text: body,
          });
          console.log(`[TEST] Email envoyé à ${recipient}. Info:`, info);
          const previewUrl = nodemailer.getTestMessageUrl(info);
          console.log(`[TEST] URL de prévisualisation pour ${recipient}:`, previewUrl);
          return previewUrl;
        }),
      );
      const previewUrls: string[] = rawPreviewUrls.filter((url): url is string => url !== false);
      console.log('[TEST] Toutes les URLs de prévisualisation:', previewUrls);

      // Sauvegarde dans la base de données (optionnel)
      const createdEmail = await this.prisma.email.create({
        data: {
          subject,
          body,
          status: 'sent',
          createdAt: new Date(),
        },
      });
      console.log('[TEST] Email enregistré en base avec ID:', createdEmail.id);
      const userEmailData = await Promise.all(
        recipients.map(async (recipient) => ({
          emailId: createdEmail.id,
          userEmail: recipient,
          userId: await this.getUserIdByEmail(recipient),
        })),
      );
      await this.prisma.userEmail.createMany({ data: userEmailData });
      console.log('[TEST] Enregistrements userEmail créés.');

      return {
        success: true,
        message: 'Test emails sent successfully.',
        previewUrls,
      };
    } catch (error) {
      console.error('[TEST] Erreur lors de l’envoi des emails:', error);
      return {
        success: false,
        message: 'Erreur lors de l’envoi des emails de test.',
      };
    }
  }

  /**
   * Méthode de production utilisant SendGrid.
   * Pour la production, assure-toi que les variables d'environnement sont définies.
   */
  async sendEmail(emailSendDto: EmailSendDto): Promise<EmailResponseDto> {
    const { subject, body, recipients } = emailSendDto;
    console.log('[PROD] Début de l’envoi des emails avec les données:', emailSendDto);

    try {
      // Configuration du transporteur avec les paramètres SendGrid depuis l'environnement
      const transporter = nodemailer.createTransport({
        host: this.configService.get<string>('MAIL_HOST'),
        port: this.configService.get<number>('MAIL_PORT'),
        secure: this.configService.get<string>('MAIL_SECURE') === 'true',
        auth: {
          user: this.configService.get<string>('MAIL_USER'),
          pass: this.configService.get<string>('MAIL_PASSWORD'),
        },
        tls: {
          // En production, il est recommandé de valider les certificats
          rejectUnauthorized: false,
        },
      });
      console.log('[PROD] Transporteur configuré avec SendGrid.');

      // Envoi des emails et récupération éventuelle des URLs de prévisualisation (souvent absentes en production)
      const sendResults = await Promise.all(
        recipients.map(async (recipient) => {
          console.log(`[PROD] Envoi de l'email à ${recipient}...`);
          const info = await transporter.sendMail({
            from: this.configService.get<string>('MAIL_FROM'),
            to: recipient,
            subject,
            text: body,
          });
          console.log(`[PROD] Email envoyé à ${recipient}. Info:`, info);
          // Dans la plupart des cas, nodemailer.getTestMessageUrl(info) renverra false en production.
          const previewUrl = nodemailer.getTestMessageUrl(info);
          if (previewUrl) {
            console.log(`[PROD] URL de prévisualisation pour ${recipient}:`, previewUrl);
          }
          return previewUrl;
        }),
      );
      const previewUrls: string[] = sendResults.filter((url): url is string => url !== false);
      console.log('[PROD] Toutes les URLs de prévisualisation collectées:', previewUrls);

      // Sauvegarde en base de données (optionnel)
      const createdEmail = await this.prisma.email.create({
        data: {
          subject,
          body,
          status: 'sent',
          createdAt: new Date(),
        },
      });
      console.log('[PROD] Email enregistré en base avec ID:', createdEmail.id);
      const userEmailData = await Promise.all(
        recipients.map(async (recipient) => {
          const userId = await this.getUserIdByEmail(recipient);
          console.log(`[PROD] Utilisateur trouvé pour ${recipient} avec ID:`, userId);
          return {
            emailId: createdEmail.id,
            userEmail: recipient,
            userId,
          };
        }),
      );
      await this.prisma.userEmail.createMany({ data: userEmailData });
      console.log('[PROD] Enregistrements userEmail créés.');

      return {
        success: true,
        message: 'Emails sent successfully.',
        previewUrls, // Ce champ sera probablement vide en production
      };
    } catch (error) {
      console.error('[PROD] Erreur lors de l’envoi des emails:', error);
      return {
        success: false,
        message: 'Erreur lors de l’envoi des emails.',
      };
    }
  }

  private async getUserIdByEmail(email: string): Promise<number> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error(`Utilisateur avec l'email ${email} non trouvé`);
    }
    return user.id;
  }
}
