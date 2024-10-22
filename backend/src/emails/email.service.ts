import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailSendDto } from './dtos/email-send.dto';
import { EmailResponseDto } from './dtos/email-send.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaService, private configService: ConfigService) {}

  async sendEmail(emailSendDto: EmailSendDto): Promise<EmailResponseDto> {
    const { subject, body, recipients } = emailSendDto;

    // Configuration du transporteur avec Nodemailer
    const transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });

    // Envoyer les emails
    try {
      const sendResults = await Promise.all(
        recipients.map((recipient) =>
          transporter.sendMail({
            from: this.configService.get('MAIL_FROM'),
            to: recipient,
            subject,
            text: body,
          }),
        ),
      );

      // Log des envois en base de données
      const createdEmail = await this.prisma.email.create({
        data: {
          subject,
          body,
          status: 'sent',
          createdAt: new Date(),
        },
      });

      const userEmailData = await Promise.all(
        recipients.map(async (recipient) => ({
          emailId: createdEmail.id,
          userEmail: recipient,
          userId: await this.getUserIdByEmail(recipient),
        })),
      );

      await this.prisma.userEmail.createMany({
        data: userEmailData,
      });

      return { success: true, message: 'Emails envoyés avec succès.' };
    } catch (error) {
      console.error('Erreur lors de l\'envoi des emails :', error);
      return { success: false, message: 'Erreur lors de l\'envoi des emails.' };
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