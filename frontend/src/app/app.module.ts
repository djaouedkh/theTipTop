import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ParticipateComponent } from './pages/participate/participate.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserGainsComponent } from './pages/user-gains/user-gains.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { AdminModule } from './admin/admin.module';
import { AdminHeaderComponent } from './admin/components/admin-header/admin-header.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        AdminModule,
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
    bootstrap: [AppComponent]
})
export class AppModule { }
