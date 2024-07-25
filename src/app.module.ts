import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { DataSynchronizerModule } from './features/data-synchronizer/data-synchronizer.module';
import { PayoutsAggregatedModule } from './features/payouts-aggregated/payouts-aggregated.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DataSynchronizerModule,
    UsersModule,
    PayoutsAggregatedModule,
  ],
})
export class AppModule {}
