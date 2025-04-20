import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { emailReducer } from './core/stores/emails/email.reducer';
import { userReducer } from './core/stores/users/user.reducer';
import { storageMetaReducer } from './core/stores/storage.metareducer';
import { TokenInterceptor } from './core/middlewares/token.interceptor';
import { ErrorComponent } from './components/pages/error/error.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ParticipateComponent } from './components/pages/participate/participate.component';
import { UserGainsComponent } from './components/pages/user-gains/user-gains.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { AboutComponent } from './components/pages/footer-pages/about.component';
import { ContactComponent } from './components/pages/footer-pages/contact.component';
import { FaqComponent } from './components/pages/footer-pages/faq.component';
import { PrivacyComponent } from './components/pages/footer-pages/privacy.component';
import { TermsComponent } from './components/pages/footer-pages/terms.component';

// Définition des meta-reducers
export const metaReducers: MetaReducer<any>[] = [storageMetaReducer];

const cookieConfig: NgcCookieConsentConfig = {
    cookie: {},
    palette: {
        popup:   { background: '#000' },
        button:  { background: '#f1d600', text: '#000' }
    },
    theme: 'edgeless',
    position: 'bottom',
    type: 'opt-in',
    content: {
        message: 'Nous utilisons des cookies pour améliorer votre expérience.',
        dismiss: 'Accepter',
        deny: 'Refuser',
        link: 'En savoir plus',
        href: '/privacy-policy'
    }
};


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AdminModule,
        NgcCookieConsentModule.forRoot(cookieConfig),

        StoreModule.forRoot(
            {
                emailState: emailReducer,
                userState: userReducer,
            },
            { metaReducers }
        ),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Nombre d'actions conservées dans l'historique pour le devtools
        }),
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        ParticipateComponent,
        UserGainsComponent,
        LoginComponent,
        ErrorComponent,
        AboutComponent,
        ContactComponent,
        TermsComponent,
        PrivacyComponent,
        FaqComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
