import { Component } from '@angular/core';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent {
    errorMessage = 'Page non trouvée ou erreur inconnue.';
}
