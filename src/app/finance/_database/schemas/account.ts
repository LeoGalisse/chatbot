import { InferSelectModel } from 'drizzle-orm';
import { decimal, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const account = pgTable('accounts', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: varchar('name', { length: 32 }).notNull().unique(),
  balance: decimal('balance', { precision: 2 }).default('0'),
  futureBalance: decimal('future-balance', { precision: 2 }).default('0'),
});

export type Account = InferSelectModel<typeof account>;