import { Injectable, Logger } from '@nestjs/common';

import { PaginationDto } from 'src/common/types/pagination.dto';

import { transactionsDataMock } from './mocks/transactions-data.mock';
import { GetTransactionsParams } from './types/get-transactions-params';
import { TransactionDto } from './types/transaction.dto';

@Injectable()
export class TransactionApiService {
  private readonly logger = new Logger(TransactionApiService.name);

  async getTransactions(
    params: GetTransactionsParams,
  ): Promise<PaginationDto<TransactionDto>> {
    this.logger.debug('getting transactions with params: ', params);

    return transactionsDataMock;
  }
}
