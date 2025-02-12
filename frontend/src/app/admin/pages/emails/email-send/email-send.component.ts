import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EmailStoreService } from '../../../../core/stores/emails/email-store.service';
import { UserGetDto } from '../../../../core/dtos/users/user-get.dto';
import { EmailResponseDto } from '../../../../core/dtos/emails/email-send.dto';
import { EmailService } from '../../../../core/services/email.service';


@Component({
  selector: 'app-email-send',
  templateUrl: './email-send.component.html',
})
export class EmailSendComponent implements OnInit {
  users$: Observable<UserGetDto[]>;
  subject: string = '';
  body: string = '';
  previewUrls: string[] = [];
  message: string = '';

  constructor(
    private emailStore: EmailStoreService,
    private _service: EmailService
  ) {}

  ngOnInit(): void {
    // Récupérer les utilisateurs sélectionnés depuis le store
    this.users$ = this.emailStore.getSelectedUsers();
    console.log('Users :', this.users$);
  }

  // Fonction pour envoyer l'email
  sendEmail(): void {
    this.users$.subscribe((users) => {
      const emailData = {
        subject: this.subject,
        body: this.body,
        recipients: users.map(user => user.email),
      };

      this._service.send(emailData).subscribe(
        (response: EmailResponseDto) => {
          console.log('Email envoyé, réponse:', response);
          this.message = response.message;
          if (response.previewUrls) {
            this.previewUrls = response.previewUrls;
          }
        },
        (error) => {
          console.error('Erreur lors de l\'envoi:', error);
          this.message = 'Erreur lors de l\'envoi de l\'email';
        }
      );
    });
  }

  // Fonction pour supprimer un utilisateur de la liste
  removeUser(index: number): void {
    this.users$.subscribe((users) => {
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1);
      this.emailStore.setSelectedUsers(updatedUsers);
    });
  }
}
