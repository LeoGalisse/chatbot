import { login } from '../../actions';

export async function POST(req: Request) {
  const formData = await req.formData();
  const result = await login({ status: 'idle' }, formData);

  return Response.json(result);
}
