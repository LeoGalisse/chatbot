/* eslint-disable no-unused-vars */
import { type Transaction, type NewTransaction, type UpdateTransaction } from '../schemas/transaction';

export interface TransactionsRepository {
  create(transaction: NewTransaction): Promise<Transaction>;
  getAll(): Promise<Transaction[]>;
  update(transaction: UpdateTransaction): Promise<Transaction>;
  delete(id: string): Promise<boolean>;
}