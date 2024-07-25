import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

import { CacheKey } from 'src/common/types/cache-key';

import { UserAggregatedTransactionsData } from './user-transactions-aggregated-data';

@Injectable()
export class UsersService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getUserById(userId: string) {
    const aggregatedTransactionsData =
      (await this.cacheManager.get<
        Record<string, UserAggregatedTransactionsData>
      >(CacheKey.TransactionsAggregatedData)) ?? {};

    return {
      id: userId,
      ...(aggregatedTransactionsData[userId] ?? {
        balance: 0,
        earned: 0,
        spent: 0,
        payout: 0,
        paidOut: 0,
      }),
    };
  }
}
