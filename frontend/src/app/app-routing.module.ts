import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { ErrorComponent } from './components/pages/error/error.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ParticipateComponent } from './components/pages/participate/participate.component';
import { UserGainsComponent } from './components/pages/user-gains/user-gains.component';
import { AboutComponent } from './components/pages/footer-pages/about.component';
import { ContactComponent } from './components/pages/footer-pages/contact.component';
import { FaqComponent } from './components/pages/footer-pages/faq.component';
import { PrivacyComponent } from './components/pages/footer-pages/privacy.component';
import { TermsComponent } from './components/pages/footer-pages/terms.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'participate', component: ParticipateComponent, canActivate: [AuthGuard] },
    { path: 'user-gains', component: UserGainsComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'auth/callback', component: LoginComponent }, // Nouvelle route pour le callback OAuth
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin', 'Employee'] } },
    
    { path: '**', component: ErrorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
