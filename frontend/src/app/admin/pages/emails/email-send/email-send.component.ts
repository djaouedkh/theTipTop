import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserGetDto } from '../../../../../../../backend/src/users/dtos/user-get.dto';
import { EmailStoreService } from '../../../../core/stores/emails/email-store.service';


@Component({
  selector: 'app-email-send',
  templateUrl: './email-send.component.html',
})
export class EmailSendComponent implements OnInit {
  users$: Observable<UserGetDto[]>;
  subject: string = '';
  body: string = '';

  constructor(
    private emailStore: EmailStoreService, 
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

      // Logique d'envoi d'email
      console.log('Email envoyé avec les données suivantes :', emailData);
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
