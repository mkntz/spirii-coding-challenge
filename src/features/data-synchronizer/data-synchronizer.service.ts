import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { TransactionApiService } from 'src/integrations/transaction-api/transaction-api.service';

import { TRANSACTIONS_CACHE_KEY } from '../transactions/constants';

@Injectable()
export class DataSynchronizerService {
  private readonly logger = new Logger(DataSynchronizerService.name);

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject() private readonly transactionApiService: TransactionApiService,
  ) {}

  @Cron('0 */2 * * * *')
  async synchronizeTransactions() {
    this.logger.debug("synchronizing 'transactions' data");

    const transactions = await this.transactionApiService.getTransactions({
      startDate: new Date(),
      endDate: new Date(),
    });

    await this.cacheManager.set(TRANSACTIONS_CACHE_KEY, transactions);
  }
}
