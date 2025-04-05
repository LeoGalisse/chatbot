import { fetchProfessorByName } from '@/app/(inatel)/professors/actions';
import { NextRequest } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: { index: string } }
) {
  const { index } = params;

  const form = new FormData();
  form.set('nomeDoProfessor', index);

  const result = await fetchProfessorByName({ status: 'idle' }, form);

  return Response.json(result);
}