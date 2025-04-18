import { eq } from 'drizzle-orm';

import {
  type NewTransaction,
  type Transaction,
  type UpdateTransaction,
  transaction as transactionTable
} from '../../schemas/transaction';

import { TransactionsRepository } from '../transaction';
import { DatabaseError, NotFoundError } from '@/lib/errors/index';
import { db } from '@/lib/db/schema';


export class DrizzleTransactionsRepository implements TransactionsRepository {
  async create(transaction: NewTransaction): Promise<Transaction> {
    try {
      const [data] = await db.insert(transactionTable).values(transaction).returning();

      return data;
    } catch (error) {
      console.error('Create transaction failed:', error);

      throw new DatabaseError('Could not create transaction', error);
    }
  }

  async getAll(): Promise<Transaction[]> {
    try {
      const data = await db.select().from(transactionTable);

      return data;
    } catch (error) {
      console.error('Get all transactions failed:', error);

      throw new DatabaseError('Could not fetch transactions', error);
    }
  }

  async update(transaction: UpdateTransaction): Promise<Transaction> {
    try {
      const [data] = await db.update(transactionTable).set(transaction).where(eq(transactionTable.id, transaction.id)).returning();

      if (!data) {
        throw new NotFoundError('Transaction not found');
      }

      return data;
    } catch (error) {
      console.error('Update transaction failed:', error);
      
      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new DatabaseError('Could not update transaction', error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const [data] = await db.delete(transactionTable).where(eq(transactionTable.id, id)).returning();

      if (!data) {
        throw new NotFoundError('Transaction not found');
      }

      return true;
    } catch (error) {
      console.error('Delete transaction failed:', error);

      if (error instanceof NotFoundError) {
        throw error;
      }
      
      throw new DatabaseError('Could not delete transaction', error);
    }
  }
}
