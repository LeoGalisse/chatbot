import { InferSelectModel } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: varchar('email', { length: 64 }).notNull(),
  password: varchar('password', { length: 64 }).notNull(),
});

export type User = InferSelectModel<typeof user>;