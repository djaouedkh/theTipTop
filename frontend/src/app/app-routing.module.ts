import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ParticipateComponent } from './pages/participate/participate.component';
import { LoginComponent } from './pages/login/login.component';
import { UserGainsComponent } from './pages/user-gains/user-gains.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'participate', component: ParticipateComponent },
    { path: 'user-gains', component: UserGainsComponent },

    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    
    { path: '**', component: ErrorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
