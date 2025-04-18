import { InferSelectModel } from 'drizzle-orm';
import { decimal, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const distribuiton = pgTable('distribuitons', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: varchar('name', { length: 32 }).notNull().unique(),
  percentage: decimal('percentage', { precision: 2 }).notNull(),
});

export type Distribuiton = InferSelectModel<typeof distribuiton>;