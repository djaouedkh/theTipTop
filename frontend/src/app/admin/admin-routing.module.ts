import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { StatsManagementComponent } from './pages/stats-management/stats-management.component';
import { LotteryGameComponent } from './pages/lottery-game/lottery-game.component';
import { EmailsComponent } from './pages/emails/emails.component';
import { EmailSendComponent } from './pages/emails/email-send/email-send.component';
import { RoleGuard } from '../core/guards/role.guard';

const adminRoutes: Routes = [
    // si rien rediriger vers dashboard
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { roles: ['Admin'] } },
    { path: 'users', component: UsersManagementComponent, canActivate: [RoleGuard], data: { roles: ['Admin', 'Employee'] } },
    { path: 'stats', component: StatsManagementComponent, canActivate: [RoleGuard], data: { roles: ['Admin'] } },
    { path: 'lottery-game', component: LotteryGameComponent, canActivate: [RoleGuard], data: { roles: ['Admin'] } },
    { path: 'emails', component: EmailsComponent, canActivate: [RoleGuard], data: { roles: ['Admin'] } },
    { path: 'email-send', component: EmailSendComponent, canActivate: [RoleGuard], data: { roles: ['Admin'] } },
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
