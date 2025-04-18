import { InferSelectModel } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const category = pgTable('categories', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: varchar('name', { length: 16 }).notNull().unique(),
});

export type Category = InferSelectModel<typeof category>;