import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-email-modal',
    templateUrl: './email-modal.component.html'
})
export class EmailModalComponent {
    @Output() close = new EventEmitter<void>();
    emailSubject = '';
    emailBody = '';

    onClose(): void {
        this.close.emit();
    }

    onSendEmail(): void {
        // Logique pour envoyer l'email
        console.log('Objet:', this.emailSubject);
        console.log('Message:', this.emailBody);
        this.onClose(); // Ferme la modale après envoi
    }
}
