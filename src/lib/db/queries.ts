import 'server-only';

import { genSaltSync, hashSync } from 'bcrypt-ts';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import {
  user,
  type User,
  professor,
  type Professor
} from './schema';
import { env } from '../env';

const client = postgres(env.DATABASE_URL);
const db = drizzle(client);

export async function getUser(email: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.email, email));
  } catch (error) {
    console.error('Failed to get user from database');
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    return await db.insert(user).values({ email, password: hash });
  } catch (error) {
    console.error('Failed to create user in database');
    throw error;
  }
}


export async function getProfessorByName(nomeDoProfessor: string): Promise<Professor[]> {
  try {
    return await db.select().from(professor).where(eq(professor.nomeDoProfessor, nomeDoProfessor));
  } catch (error) {
    console.error('Failed to get professor from database');
    throw error;
  }
}

export async function createProfessor(data: Omit<Professor, 'id'>) {
  try {
    return await db.insert(professor).values(data);
  } catch (error) {
    console.error('Failed to create professor in database');
    throw error;
  }
}

export async function updateProfessor(
  nomeDoProfessor: string,
  updates: Partial<Professor>
) {
  try {
    return await db
      .update(professor)
      .set(updates)
      .where(eq(professor.nomeDoProfessor, nomeDoProfessor));
  } catch (error) {
    console.error('Failed to update professor');
    throw error;
  }
}

export async function deleteProfessor(nomeDoProfessor: string) {
  try {
    return await db.delete(professor).where(eq(professor.nomeDoProfessor, nomeDoProfessor));
  } catch (error) {
    console.error('Failed to delete professor');
    throw error;
  }
}

export async function listProfessors(): Promise<Professor[]> {
  try {
    return await db.select().from(professor);
  } catch (error) {
    console.error('Failed to list professors');
    throw error;
  }
}