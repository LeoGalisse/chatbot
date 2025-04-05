import { NextRequest } from 'next/server';
import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';

vi.mock('@/app/(inatel)/professors/actions', () => ({
  registerProfessor: vi.fn(),
  updateProfessorAction: vi.fn(),
  deleteProfessorAction: vi.fn(),
  listAllProfessors: vi.fn(),
}));

import { GET, DELETE, POST, PUT } from '@/app/(inatel)/api/professor/route';
import * as actions from '@/app/(inatel)/professors/actions';

const mockedRegister = actions.registerProfessor as Mock;
const mockedUpdate = actions.updateProfessorAction as Mock;
const mockedDelete = actions.deleteProfessorAction as Mock;
const mockedList = actions.listAllProfessors as Mock;

describe('Professor API - Success Cases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a new professor', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'Teste Professor');
    form.set('horarioDeAtendimento', 'Segunda 10:00-12:00');
    form.set('periodo', 'integral');
    form.set('sala', '101');
    form.set('predio', JSON.stringify(['1', '2']));

    mockedRegister.mockResolvedValue({
      status: 'success',
      message: 'Professor created',
      data: {
        nomeDoProfessor: 'Teste Professor',
      },
    });

    const req = new NextRequest('http://localhost:3000/api/professor', {
      method: 'POST',
      body: form
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('success');
  });

  it('should return the created professor', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'Teste Professor');

    mockedRegister.mockResolvedValue({
      status: 'success',
      data: { nomeDoProfessor: 'Teste Professor' }
    });

    const req = new Request('http://localhost/api/professor', {
      method: 'POST',
      body: form,
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.status).toBe('success');
    expect(data.data.nomeDoProfessor).toBe('Teste Professor');
  });

  it('should update professor data', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'Teste Professor');
    form.set('updates', JSON.stringify({ sala: '202' }));
  
    mockedUpdate.mockResolvedValue({
      status: 'success',
      data: { nomeDoProfessor: 'Teste Professor', sala: '202' }
    });
  
    const req = new Request('http://localhost/api/professor', {
      method: 'PUT',
      body: form,
    });
  
    const res = await PUT(req);
    const data = await res.json();
  
    expect(res.status).toBe(200);
    expect(data.status).toBe('success');
  });

  it('should return the updated professor', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'Teste Professor');
  
    mockedRegister.mockResolvedValue({
      status: 'success',
      data: { nomeDoProfessor: 'Teste Professor', sala: '202' }
    });
  
    const req = new Request('http://localhost/api/professor', {
      method: 'POST',
      body: form,
    });
  
    const res = await POST(req);
    const data = await res.json();
  
    expect(data.data.sala).toBe('202');
  });

  it('should list all professors', async () => {
    mockedList.mockResolvedValue({
      status: 'success',
      data: [{ nomeDoProfessor: 'Teste' }, { nomeDoProfessor: 'Outro' }]
    });
  
    const res = await GET();
    const data = await res.json();
  
    expect(res.status).toBe(200);
    expect(data.status).toBe('success');
    expect(Array.isArray(data.data)).toBe(true);
  });

  it('should delete a professor', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'Teste Professor');
  
    mockedDelete.mockResolvedValue({
      status: 'success'
    });
  
    const req = new Request('http://localhost/api/professor', {
      method: 'DELETE',
      body: form,
    });
  
    const res = await DELETE(req);
    const data = await res.json();
  
    expect(data.status).toBe('success');
  });

  it('should return not_found for deleted professor', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'Teste Professor');
  
    mockedRegister.mockResolvedValue({
      status: 'not_found'
    });
  
    const req = new Request('http://localhost/api/professor', {
      method: 'POST',
      body: form,
    });
  
    const res = await POST(req);
    const data = await res.json();
  
    expect(data.status).toBe('not_found');
  });

  it('should support multiple predio values', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'MultPredio');
    form.set('horarioDeAtendimento', 'Terça 08:00-10:00');
    form.set('periodo', 'noturno');
    form.set('sala', '303');
    form.set('predio', JSON.stringify(['1', '2', '3']));
  
    mockedRegister.mockResolvedValue({ status: 'success' });
  
    const req = new Request('http://localhost/api/professor', {
      method: 'POST',
      body: form,
    });
  
    const res = await POST(req);
    const data = await res.json();
  
    expect(data.status).toBe('success');
  });

  it('should support multiple predio values', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'MultPredio');
    form.set('horarioDeAtendimento', 'Terça 08:00-10:00');
    form.set('periodo', 'noturno');
    form.set('sala', '303');
    form.set('predio', JSON.stringify(['1', '2', '3']));
  
    mockedRegister.mockResolvedValue({ status: 'success' });
  
    const req = new Request('http://localhost/api/professor', {
      method: 'POST',
      body: form,
    });
  
    const res = await POST(req);
    const data = await res.json();
  
    expect(data.status).toBe('success');
  });

  it('should update multiple fields', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'MultPredio');
    form.set('updates', JSON.stringify({
      horarioDeAtendimento: 'Quarta 14:00-16:00',
      sala: '404'
    }));
  
    mockedUpdate.mockResolvedValue({ status: 'success' });
  
    const req = new Request('http://localhost/api/professor', {
      method: 'PUT',
      body: form,
    });
  
    const res = await PUT(req);
    const data = await res.json();

    expect(data.status).toBe('success');
  });

  it('should clean up test professor', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'MultPredio');
  
    mockedDelete.mockResolvedValue({ status: 'success' });
  
    const req = new Request('http://localhost/api/professor', {
      method: 'DELETE',
      body: form,
    });
  
    const res = await DELETE(req);
    const data = await res.json();
  
    expect(data.status).toBe('success');
  });
});
