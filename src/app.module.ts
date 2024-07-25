import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { DataSynchronizerModule } from './features/data-synchronizer/data-synchronizer.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DataSynchronizerModule,
  ],
})
export class AppModule {}
