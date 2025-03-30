import { questions } from '@/lib/questions';
import { NextResponse } from 'next/server';

const userAnswers: Record<number, string> = {};

export async function POST(request: Request) {
  const { questionId, answerId } = await request.json();

  userAnswers[questionId] = answerId;

  if (Object.keys(userAnswers).length === questions.length) {
    const results = questions.map((question) => {
      const userAnswer = userAnswers[question.id];
      const correctOption = question.options.find((opt) => opt.id === question.correctAnswer);

      return {
        correct: userAnswer === question.correctAnswer,
        question: question.text,
        correctAnswer: correctOption?.text || '',
      };
    });

    const score = results.filter((r) => r.correct).length;

    Object.keys(userAnswers).forEach((key) => {
      delete userAnswers[Number(key)];
    });

    return NextResponse.json({ results, score });
  }

  return NextResponse.json({ success: true });
}