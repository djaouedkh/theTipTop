import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StatsManagementComponent } from './pages/stats-management/stats-management.component';
import { EmailModalComponent } from './components/email-modal/email-modal.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { LotteryGameComponent } from './pages/lottery-game/lottery-game.component';
import { EmailsComponent } from './pages/emails/emails.component';
import { EmailSendComponent } from './pages/emails/email-send/email-send.component';

@NgModule({
    declarations: [
        AdminHeaderComponent,
        DashboardComponent,
        StatsManagementComponent,
        EmailModalComponent,
        UsersManagementComponent,
        LotteryGameComponent,
        EmailsComponent,
        EmailSendComponent,
        // Ajoutez d'autres composants si nécessaire
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        RouterModule,
        FormsModule,
        HighchartsChartModule,
    ],
    exports: [
        AdminHeaderComponent
    ]
})
export class AdminModule {}
