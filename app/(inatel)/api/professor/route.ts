import { registerProfessor, updateProfessorAction, deleteProfessorAction, listAllProfessors } from '@/app/(inatel)/professors/actions';

export async function GET() {
  const result = await listAllProfessors();
  return Response.json(result);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const result = await registerProfessor({ status: 'idle' }, formData);

  return Response.json(result);
}

export async function PUT(req: Request) {
  const formData = await req.formData();
  const result = await updateProfessorAction({ status: 'idle' }, formData);

  return Response.json(result);
}

export async function DELETE(req: Request) {
  const formData = await req.formData();
  const result = await deleteProfessorAction({ status: 'idle' }, formData);

  return Response.json(result);
}
