import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

import { CacheKey } from 'src/common/types/cache-key';

import { UserPayoutRequests } from '../users/user-payout-request';

@Injectable()
export class PayoutsAggregatedService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getAll() {
    const usersPayoutRequests =
      (await this.cacheManager.get<Record<string, UserPayoutRequests>>(
        CacheKey.UsersPayoutRequests,
      )) ?? {};

    return Object.values(usersPayoutRequests);
  }
}
