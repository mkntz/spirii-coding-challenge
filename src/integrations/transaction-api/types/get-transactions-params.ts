import { PaginationParams } from 'src/common/types/pagination-params';

export interface GetTransactionsParams extends PaginationParams {
  startDate: Date;
  endDate: Date;
}
