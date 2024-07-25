import { Module } from '@nestjs/common';

import { PayoutsAggregatedController } from './payouts-aggregated.controller';
import { PayoutsAggregatedService } from './payouts-aggregated.service';

@Module({
  controllers: [PayoutsAggregatedController],
  providers: [PayoutsAggregatedService],
})
export class PayoutsAggregatedModule {}
