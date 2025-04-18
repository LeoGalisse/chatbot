'use server';

import { z } from 'zod';

import {
  createProfessor,
  deleteProfessor,
  getProfessorByName,
  listProfessors,
  updateProfessor
} from '@/lib/db/queries';
import { Professor } from '@/models/professor';

const professorSchema = z.object({
  nomeDoProfessor: z.string().min(1),
  horarioDeAtendimento: z.string().min(1),
  periodo: z.string(),
  sala: z.string().min(1),
});

const updateProfessorSchema = z.object({
  nomeDoProfessor: z.string().min(1),
  updates: professorSchema.partial(),
});

export interface ProfessorActionState {
  status: 'idle' | 'success' | 'failed' | 'invalid_data' | 'not_found';
  data?: Professor | Professor[];
}


export async function registerProfessor(
  _: ProfessorActionState,
  formData: FormData
): Promise<ProfessorActionState> {
  try {
    const parsed = professorSchema.parse({
      nomeDoProfessor: formData.get('nomeDoProfessor'),
      horarioDeAtendimento: formData.get('horarioDeAtendimento'),
      periodo: formData.get('periodo'),
      sala: formData.get('sala'),
    });

    await createProfessor(parsed);

    return { status: 'success' };
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) return { status: 'invalid_data' };
    return { status: 'failed' };
  }
}

export async function fetchProfessorByName(
  _: ProfessorActionState,
  formData: FormData
): Promise<ProfessorActionState> {
  try {
    const nome = z.string().min(1).parse(formData.get('nomeDoProfessor'));
    const result = await getProfessorByName(nome);

    if (!result.length) return { status: 'not_found' };

    return { status: 'success', data: result[0] };
  } catch (error) {
    if (error instanceof z.ZodError) return { status: 'invalid_data' };
    return { status: 'failed' };
  }
}

export async function updateProfessorAction(
  _: ProfessorActionState,
  formData: FormData
): Promise<ProfessorActionState> {
  try {
    const parsed = updateProfessorSchema.parse({
      nomeDoProfessor: formData.get('nomeDoProfessor'),
      updates: JSON.parse(formData.get('updates') as string),
    });

    await updateProfessor(parsed.nomeDoProfessor, parsed.updates);
    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) return { status: 'invalid_data' };
    return { status: 'failed' };
  }
}

export async function deleteProfessorAction(
  _: ProfessorActionState,
  formData: FormData
): Promise<ProfessorActionState> {
  try {
    const nome = z.string().min(1).parse(formData.get('nomeDoProfessor'));
    await deleteProfessor(nome);
    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) return { status: 'invalid_data' };
    return { status: 'failed' };
  }
}

export async function listAllProfessors(): Promise<ProfessorActionState> {
  try {
    const list = await listProfessors();
    return { status: 'success', data: list };
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 'failed' };
  }
}
