import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { CacheKey } from 'src/common/types/cache-key';
import { TransactionApiService } from 'src/integrations/transaction-api/transaction-api.service';
import { TransactionType } from 'src/integrations/transaction-api/types/transaction-type.enum';

import { UserPayoutRequests } from '../users/user-payout-request';
import { UserAggregatedTransactionsData } from '../users/user-transactions-aggregated-data';

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

    const startDate = new Date();
    startDate.setSeconds(0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 2);

    const transactions = await this.transactionApiService.getTransactions({
      startDate,
      endDate,
    });

    const transactionsAggregatedData =
      (await this.cacheManager.get<
        Record<string, UserAggregatedTransactionsData>
      >(CacheKey.TransactionsAggregatedData)) ?? {};

    const usersPayoutRequests =
      (await this.cacheManager.get<Record<string, UserPayoutRequests>>(
        CacheKey.UsersPayoutRequests,
      )) ?? {};

    transactions.items
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .forEach((transaction) => {
        const currentUserAggregatedData = transactionsAggregatedData[
          transaction.userId
        ] ?? {
          balance: 0,
          earned: 0,
          spent: 0,
          payout: 0,
          paidOut: 0,
        };

        const currentUserPayoutRequests = usersPayoutRequests[
          transaction.userId
        ] ?? {
          userId: transaction.userId,
          amount: 0,
        };

        switch (transaction.type) {
          case TransactionType.Earned:
            currentUserAggregatedData.earned += transaction.amount;
            currentUserAggregatedData.balance += transaction.amount;
            break;
          case TransactionType.Spent:
            currentUserAggregatedData.spent += transaction.amount;
            currentUserAggregatedData.balance -= transaction.amount;
            break;
          case TransactionType.Payout:
            currentUserAggregatedData.payout += transaction.amount;
            currentUserAggregatedData.balance += transaction.amount;
            currentUserPayoutRequests.amount += transaction.amount;
            break;
        }

        transactionsAggregatedData[transaction.userId] =
          currentUserAggregatedData;
        usersPayoutRequests[transaction.userId] = currentUserPayoutRequests;
      });

    await this.cacheManager.set(
      CacheKey.TransactionsAggregatedData,
      transactionsAggregatedData,
      60 * 60 * 1000,
    );

    await this.cacheManager.set(
      CacheKey.UsersPayoutRequests,
      usersPayoutRequests,
      60 * 60 * 1000,
    );
  }
}
