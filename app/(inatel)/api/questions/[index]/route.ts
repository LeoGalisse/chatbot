import { NextRequest } from 'next/server';
import { questions } from '@/lib/questions';

export async function GET(
  _: NextRequest,
  { params }: { params: { index: number } }
) {
  const { index } = params;

  if (index >= 0 && index < questions.length) {
    const question = questions[index];

    return Response.json({
      id: question.id,
      text: question.text,
      options: question.options,
    });
  }

  return new Response(JSON.stringify({ error: 'Question not found' }), { status: 404 });
}