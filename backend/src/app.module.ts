import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { PrismaService } from '../prisma/prisma.service';
import { TicketModule } from './tickets/ticket.module';
import { GainModule } from './gains/gain.module';
import { StoreModule } from './stores/store.module';
import { RoleModule } from './roles/role.module';
import { ContestModule } from './contests/contest.module';
import { GainDeliveryModule } from './gain-deliveries/gain-delivery.module';
import { UseCaseModule } from './use-cases/use-case.module';
import { ParseIntMiddleware } from './middlewares/parse-int.middleware';
import { LotteryGameModule } from './lottery-games/lottery-game.module';

@Module({
  imports: [
    UserModule,
    TicketModule,
    GainModule,
    StoreModule,
    RoleModule,
    GainDeliveryModule,
    ContestModule,
    LotteryGameModule,
    UseCaseModule,
  ],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ParseIntMiddleware).forRoutes('*');
  }
}
