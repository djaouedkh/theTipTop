import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

// Définition des meta-reducers
export const metaReducers: MetaReducer<any>[] = [storageMetaReducer];

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AdminModule,

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
        // autres composants
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
