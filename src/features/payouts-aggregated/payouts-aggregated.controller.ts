import { Controller, Get } from '@nestjs/common';

import { PayoutsAggregatedService } from './payouts-aggregated.service';

@Controller('payouts-aggregated')
export class PayoutsAggregatedController {
  constructor(
    private readonly payoutsAggregatedService: PayoutsAggregatedService,
  ) {}

  @Get()
  async get() {
    return {
      items: await this.payoutsAggregatedService.getAll(),
    };
  }
}
