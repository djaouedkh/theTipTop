// src/app/pages/login/login.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { UserStoreService } from '../../core/stores/users/user-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthResponseDto } from '../../../../../backend/src/auth/dtos/auth-response.dto';
import { UserLoginGoogleDto } from '../../../../../backend/src/auth/external-auth/dtos/user-login-google.dto';

class MockAuthService {
  login() {
    return of({ isSuccess: true } as AuthResponseDto);
  }
  register() {
    return of({ isSuccess: true } as AuthResponseDto);
  }
  loginPostGoogleAuth() {
    return of({ isSuccess: true } as AuthResponseDto);
  }
}

class MockUserStoreService {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserStoreService, useClass: MockUserStoreService },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ isSuccess: 'true', email: 'test@example.com', isGoogleRegister: 'false' })
          }
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should initialize the forms on ngOnInit and handle Google authentication return', () => {
    spyOn(component, 'initForms');
    spyOn(authService, 'loginPostGoogleAuth').and.returnValue(of({ isSuccess: true } as AuthResponseDto));
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(component.initForms).toHaveBeenCalled();
    expect(authService.loginPostGoogleAuth).toHaveBeenCalledWith({ email: 'test@example.com' } as UserLoginGoogleDto);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should login successfully and navigate to home page', () => {
    spyOn(authService, 'login').and.returnValue(of({ isSuccess: true } as AuthResponseDto));
    spyOn(router, 'navigate');
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });

    component.login();

    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set error message if login fails', () => {
    spyOn(authService, 'login').and.returnValue(of({ isSuccess: false, message: 'Login failed' } as AuthResponseDto));
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });

    component.login();

    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(component.errorMessage).toBe('Login failed');
  });

  it('should register successfully and navigate to home page', () => {
    spyOn(authService, 'register').and.returnValue(of({ isSuccess: true } as AuthResponseDto));
    spyOn(router, 'navigate');
    component.registerForm.setValue({
      firstname: 'John',
      lastname: 'Doe',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      gender: 'male',
      age: 30
    });

    component.register();

    expect(authService.register).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set error message if passwords do not match during registration', () => {
    component.registerForm.setValue({
      firstname: 'John',
      lastname: 'Doe',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password456',
      gender: 'male',
      age: 30
    });

    component.register();

    expect(component.errorMessage).toBe('Les mots de passe ne correspondent pas.');
  });

  it('should toggle between login and register mode', () => {
    component.isLoginMode = true;

    component.toggleMode();

    expect(component.isLoginMode).toBeFalse();

    component.toggleMode();

    expect(component.isLoginMode).toBeTrue();
  });
});