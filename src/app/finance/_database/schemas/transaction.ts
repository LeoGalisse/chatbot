import { date, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { category } from './category';
import { distribuiton } from './distribuiton';
import { account } from './account';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const transaction = pgTable('transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: varchar('type', { length: 16 }).notNull(),
  category: uuid('category').references(() => category.id, { onDelete: 'no action' }).notNull(),
  date: date('date', { mode: 'date' }).notNull(),
  distribuiton: uuid('distribuiton').references(() => distribuiton.id, { onDelete: 'no action' }).notNull(),
  account: uuid('account').references(() => account.id, { onDelete: 'no action' }).notNull(),
  status: varchar('status', { length: 16 }).notNull(),
  description: varchar('description', { length: 128 }),
});

export type Transaction = InferSelectModel<typeof transaction>;
export type NewTransaction = InferInsertModel<typeof transaction>;
export type UpdateTransaction = Partial<Omit<Transaction, 'id'>> & Pick<Transaction, 'id'>;