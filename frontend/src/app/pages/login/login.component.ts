import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginMode: boolean = true; // Mode par défaut : connexion

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForms();
  }

  // Initialisation des formulaires de connexion et d'inscription
  initForms() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email valide requis
      password: ['', [Validators.required, Validators.minLength(6)]], // Mdp avec min 6 caractères
    });

    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]], // Prénom min 2 caractères
      lastname: ['', [Validators.required, Validators.minLength(2)]],  // Nom min 2 caractères
      email: ['', [Validators.required, Validators.email]],  // Email valide requis
      password: ['', [Validators.required, Validators.minLength(6)]],  // Mdp avec min 6 caractères
      confirmPassword: ['', [Validators.required]], // Confirmation du mdp
      gender: ['', Validators.required], // Genre requis
      age: ['', [Validators.required, Validators.min(18)]], // Âge min 18 ans
    });
  }

  // Vérifie si un champ est invalide et a été touché
  // Vérifie si un champ est invalide, qu'il soit "touché" ou non
isInvalid(controlName: string, form: FormGroup): boolean {
    const control = form.get(controlName);
    return control?.invalid ? true : false; // Plus besoin de vérifier si le champ est "touched"
  }
  

  // Inscription via formulaire classique
// Inscription via formulaire classique
register() {
    if (this.registerForm.invalid) {
        this.registerForm.markAllAsTouched(); // Marque tous les champs comme touchés
        return;
    }
  
    const { firstname, lastname, email, password, confirmPassword, gender, age } = this.registerForm.value;
    if (password === confirmPassword) {
      this.authService.register({ firstname, lastname, email, password, gender, age, roleId: 1 }).subscribe(
        (response) => {
          console.log('Inscription réussie', response);
        },
        (error) => {
          console.error('Erreur lors de l\'inscription', error);
        }
      );
    } else {
      console.error('Les mots de passe ne correspondent pas');
    }
  }
  
  // Connexion via formulaire classique
  login() {
    if (this.loginForm.invalid) {
      // Marque tous les champs comme touchés pour forcer l'affichage des erreurs
      this.loginForm.markAllAsTouched();
      return;
    }
  
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      (response) => {
        console.log('Connexion réussie', response);
      },
      (error) => {
        console.error('Erreur lors de la connexion', error);
      }
    );
  }
  
  

  // Basculer entre le mode de connexion et d'inscription
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
