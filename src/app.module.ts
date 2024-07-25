import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { DataSynchronizerModule } from './features/data-synchronizer/data-synchronizer.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DataSynchronizerModule,
    UsersModule,
  ],
})
export class AppModule {}
