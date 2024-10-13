import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TicketListComponent } from './pages/ticket-management/ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './pages/ticket-management/ticket-details/ticket-details.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UserListComponent } from './pages/user-management/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-management/user-details/user-details.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StatsManagementComponent } from './pages/stats-management/stats-management.component';
import { EmailModalComponent } from './components/email-modal/email-modal.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';

@NgModule({
    declarations: [
        AdminHeaderComponent,
        DashboardComponent,
        TicketListComponent,
        TicketDetailsComponent,
        UserManagementComponent,
        UserListComponent,
        UserDetailsComponent,
        StatsManagementComponent,
        EmailModalComponent,
        // Ajoutez d'autres composants si nécessaire
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        AdminHeaderComponent
    ]
})
export class AdminModule {}
