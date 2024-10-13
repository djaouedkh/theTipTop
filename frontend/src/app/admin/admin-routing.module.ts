import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TicketListComponent } from './pages/ticket-management/ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './pages/ticket-management/ticket-details/ticket-details.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UserListComponent } from './pages/user-management/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-management/user-details/user-details.component';
import { StatsManagementComponent } from './pages/stats-management/stats-management.component';

const adminRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'tickets', component: TicketListComponent },
    { path: 'tickets/:id', component: TicketDetailsComponent },
    { path: 'users', component: UserManagementComponent,
        children: [
            { path: '', component: UserListComponent },
            { path: ':id', component: UserDetailsComponent }
        ]
    },
    { path: 'stats', component: StatsManagementComponent },
    // { path: 'stats', component: StatsManagementComponent }
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
