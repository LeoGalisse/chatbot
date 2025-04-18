import { NextRequest } from 'next/server';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/__tests__/mock/questions', () => ({
  questions: [
    { id: 1, text: 'What is 2+2?', options: ['3', '4', '5'] },
    { id: 2, text: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris'] },
  ],
}));

import { GET } from '@/app/(inatel)/api/questions/[index]/route';

describe('API: /api/[index]', () => {
  it('should return a valid question for a valid index', async () => {
    const req = new NextRequest('http://localhost:3000/api/questions/1');
    const params = { index: 1 };

    const response = await GET(req, { params });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      id: 2,
      text: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris'],
    });
  });

  it('should return 404 for an invalid index', async () => {
    const req = new NextRequest('http://localhost:3000/api/questions/99');
    const params = { index: 99 };

    const response = await GET(req, { params });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({ error: 'Question not found' });
  });

  it('should return 404 for a negative index', async () => {
    const req = new NextRequest('http://localhost:3000/api/questions/-1');
    const params = { index: -1 };

    const response = await GET(req, { params });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({ error: 'Question not found' });
  });
});
