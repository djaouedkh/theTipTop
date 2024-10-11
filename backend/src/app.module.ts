import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { PrismaService } from '../prisma/prisma.service';
import { TicketModule } from './tickets/ticket.module';
import { PrizeModule } from './prizes/prize.module';
import { StoreModule } from './stores/store.module';
import { RoleModule } from './roles/role.module';
import { PrizeDistributionModule } from './prize-distributions/prize-distribution.module';
import { ContestModule } from './contests/contest.module';

@Module({
  imports: [
    UserModule,
    TicketModule,
    PrizeModule,
    StoreModule,
    RoleModule,
    PrizeDistributionModule,
    ContestModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
