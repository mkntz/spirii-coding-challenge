import { describe } from 'node:test';

import { Test, TestingModule } from '@nestjs/testing';

import { TransactionApiService } from './transaction-api.service';

describe('TransactionApiService', () => {
  let service: TransactionApiService;

  beforeEach(async () => {
    const testApp: TestingModule = await Test.createTestingModule({
      providers: [TransactionApiService],
    }).compile();

    service = testApp.get(TransactionApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
