import { TransactionType } from '../types/transaction-type.enum';

export interface TransactionDto {
  id: string;
  type: TransactionType;
  amount: number;
  userId: string;
  createdAt: Date;
}
