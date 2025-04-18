import { InferSelectModel } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import * as FinanceSchemas from '@/app/finance/_database/schemas/index';

import { env } from '../env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, {
  schema: {
    FinanceSchemas
  }
});

export const user = pgTable('users', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: varchar('email', { length: 64 }).notNull(),
  password: varchar('password', { length: 64 }).notNull(),
});

export type User = InferSelectModel<typeof user>;

export const professor = pgTable('professores', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  nomeDoProfessor: varchar('nome_do_professor', { length: 64 }).notNull(),
  horarioDeAtendimento: varchar('horario_de_atendimento', { length: 64 }).notNull(),
  periodo: varchar('periodo', { length: 16 }).notNull(),
  sala: varchar('sala', { length: 8 }).notNull(),
});

export type Professor = InferSelectModel<typeof professor>;