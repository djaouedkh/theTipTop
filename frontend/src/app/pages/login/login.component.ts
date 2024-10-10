import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    email: string = '';
    password: string = '';
    errorMessage: string | null = null;

    // constructor(private authService: AuthService, private router: Router) {}

    onSubmit(): void {
        // this.authService.login(this.email, this.password).subscribe({
        //     next: (response) => {
        //         this.router.navigate(['/home']);
        //     },
        //     error: (err) => {
        //         this.errorMessage = "Erreur de connexion. Veuillez vérifier vos informations.";
        //     }
        // });
    }
    

    loginWithGoogle(): void {
        // const fakeGoogleToken = 'GOOGLE_FAKE_TOKEN'; // Remplacer par un token réel ou implémenter un mécanisme d'obtention
        // this.authService.loginWithGoogle(fakeGoogleToken).subscribe({
        //     next: () => this.router.navigate(['/home']),
        //     error: () => this.errorMessage = "Erreur de connexion avec Google."
        // });
    }
    
    loginWithFacebook(): void {
        // const fakeFacebookToken = 'FACEBOOK_FAKE_TOKEN'; // Remplacer par un token réel ou implémenter un mécanisme d'obtention
        // this.authService.loginWithFacebook(fakeFacebookToken).subscribe({
        //     next: () => this.router.navigate(['/home']),
        //     error: () => this.errorMessage = "Erreur de connexion avec Facebook."
        // });
    }
}
