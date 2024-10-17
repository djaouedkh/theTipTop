import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { StatsManagementComponent } from './pages/stats-management/stats-management.component';
import { LotteryGameComponent } from './pages/lottery-game/lottery-game.component';

const adminRoutes: Routes = [
    // si rien rediriger vers dashboard
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'users', component: UsersManagementComponent },
    { path: 'stats', component: StatsManagementComponent },
    { path: 'lottery-game', component: LotteryGameComponent },
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
