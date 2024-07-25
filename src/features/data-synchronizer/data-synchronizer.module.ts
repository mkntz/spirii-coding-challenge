import { Module } from '@nestjs/common';

import { TransactionApiModule } from 'src/integrations/transaction-api/transaction-api.module';

import { DataSynchronizerService } from './data-synchronizer.service';

@Module({
  imports: [TransactionApiModule],
  providers: [DataSynchronizerService],
})
export class DataSynchronizerModule {}
