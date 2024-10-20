import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserStoreService } from '../../core/stores/users/user-store.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup; // Formulaire de connexion classique
    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService, // Service d'authentification
        private userStore: UserStoreService, // Service pour stocker les informations de l'utilisateur
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    // Méthode pour la connexion classique
    login(): void {
        if (this.loginForm.invalid) {
            return;
        }

        const { email, password } = this.loginForm.value;
        this.authService.login(email, password).subscribe({
            next: (user) => {
                this.userStore.setUser(user.id, user.firstname, user.email, user.role); // Stocke l'utilisateur dans le store
                this.redirectByRole(user.role); // Redirige en fonction du rôle
            },
            error: (error) => {
                this.errorMessage = error.message;
            },
        });
    }

    // Connexion via Google
    loginWithGoogle(): void {
        this.authService.loginWithGoogle().subscribe({
            next: (user) => {
                this.userStore.setUser(user.id, user.firstname, user.email, user.role);
                this.redirectByRole(user.role);
            },
            error: (error) => {
                this.errorMessage = error.message;
            },
        });
    }

    // Connexion via Facebook
    loginWithFacebook(): void {
        this.authService.loginWithFacebook().subscribe({
            next: (user) => {
                this.userStore.setUser(user.id, user.firstname, user.email, user.role);
                this.redirectByRole(user.role);
            },
            error: (error) => {
                this.errorMessage = error.message;
            },
        });
    }

    // Redirige en fonction du rôle
    redirectByRole(role: string): void {
        if (role === 'Admin') {
            this.router.navigate(['/admin/dashboard']);
        } else if (role === 'Employee') {
            this.router.navigate(['/employee']);
        } else {
            this.router.navigate(['/participate']);
        }
    }
}
