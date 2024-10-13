import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { PrismaService } from '../prisma/prisma.service';
import { TicketModule } from './tickets/ticket.module';
import { GainModule } from './gains/gain.module';
import { StoreModule } from './stores/store.module';
import { RoleModule } from './roles/role.module';
import { ContestModule } from './contests/contest.module';
import { GainDeliveryModule } from './gain-deliveries/gain-delivery.module';
import { UseCaseModule } from './use-cases/use-case.module';

@Module({
  imports: [
    UserModule,
    TicketModule,
    GainModule,
    StoreModule,
    RoleModule,
    GainDeliveryModule,
    ContestModule,
    UseCaseModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
