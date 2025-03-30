import { NextRequest } from 'next/server';
import { questions } from '@/lib/questions';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ index: number }> }
) {
  const { index } = await params;

  if (index >= 0 && index < questions.length) {
    const question = questions[index];

    return Response.json({
      id: question.id,
      text: question.text,
      options: question.options,
    });
  }

  throw new Error('Question not found');
}