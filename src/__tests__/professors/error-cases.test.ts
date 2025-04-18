import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

vi.mock('@/app/(inatel)/professors/actions', () => ({
  registerProfessor: vi.fn(),
  updateProfessorAction: vi.fn(),
  deleteProfessorAction: vi.fn(),
  listAllProfessors: vi.fn(),
  fetchProfessorByName: vi.fn()
}));

import { DELETE, POST, PUT } from '@/app/(inatel)/api/professor/route';
import { GET } from '@/app/(inatel)/api/professor/[index]/route';
import * as actions from '@/app/(inatel)/professors/actions';
import { NextRequest } from 'next/server';

const mockedRegister = actions.registerProfessor as Mock;
const mockedUpdate = actions.updateProfessorAction as Mock;
const mockedDelete = actions.deleteProfessorAction as Mock;
const mockedFetch = actions.fetchProfessorByName as Mock;

describe('Professor API - Error Cases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fail to create professor with missing name', async () => {
    const form = new FormData();
    form.set('horarioDeAtendimento', 'Segunda 10:00-12:00');
    form.set('periodo', 'integral');
    form.set('sala', '101');
    form.set('predio', JSON.stringify(['1', '2']));

    mockedRegister.mockResolvedValueOnce({ status: 'invalid_data' });

    const req = new NextRequest('http://localhost:3000/api/professor', {
      method: 'POST',
      body: form,
    });
    const res = await POST(req);
    const data = await res.json();

    expect(data.status).toBe('invalid_data');
  });

  it('should fail with invalid periodo', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'ErroPeriodo');
    form.set('horarioDeAtendimento', 'Segunda 10:00-12:00');
    form.set('periodo', 'manha');
    form.set('sala', '102');
    form.set('predio', JSON.stringify(['1']));

    mockedRegister.mockResolvedValueOnce({ status: 'invalid_data' });

    const req = new NextRequest('http://localhost:3000/api/professor', {
      method: 'POST',
      body: form,
    });
    const res = await POST(req);
    const data = await res.json();

    expect(data.status).toBe('invalid_data');
  });

  it('should fail to parse invalid predio JSON', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'ErroJSON');
    form.set('horarioDeAtendimento', 'Segunda 10:00-12:00');
    form.set('periodo', 'integral');
    form.set('sala', '102');
    form.set('predio', '[1, 2');

    mockedRegister.mockImplementationOnce(() => {
      throw new Error('Invalid JSON');
    });

    try {
      const req = new NextRequest('http://localhost:3000/api/professor', {
        method: 'POST',
        body: form,
      });
      
      await POST(req);
    } catch (error) {
      expect((error as Error).message).toBe('Invalid JSON');
    }
  });

  it('should fail to update nonexistent professor', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'Inexistente');
    form.set('updates', JSON.stringify({ sala: '999' }));

    mockedUpdate.mockResolvedValueOnce({ status: 'success' });

    const req = new NextRequest('http://localhost:3000/api/professor', {
      method: 'PUT',
      body: form,
    });
    const res = await PUT(req);
    const data = await res.json();

    expect(data.status).toBe('success');
  });

  it('should return not_found on get of nonexistent professor', async () => {
    const params = { params: { index: 'Inexistente' } };

    mockedFetch.mockResolvedValueOnce({ status: 'not_found' });

    const req = new NextRequest('http://localhost:3000/api/professor', {
      method: 'GET',
    });

    const res = await GET(req, params);
    const data = await res.json();

    expect(data.status).toBe('not_found');
  });

  it('should fail to delete nonexistent professor', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'NaoExiste');

    mockedDelete.mockResolvedValueOnce({ status: 'success' });

    const req = new NextRequest('http://localhost:3000/api/professor', {
      method: 'DELETE',
      body: form,
    });
    const res = await DELETE(req);
    const data = await res.json();

    expect(data.status).toBe('success');
  });

  it('should succeed with empty update payload', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'Qualquer');
    form.set('updates', JSON.stringify({}));

    mockedUpdate.mockResolvedValueOnce({ status: 'success' });

    const req = new NextRequest('http://localhost:3000/api/professor', {
      method: 'PUT',
      body: form,
    });
    const res = await PUT(req);
    const data = await res.json();

    expect(data.status).toBe('success');
  });

  it('should return invalid_data with non-string predio', async () => {
    const form = new FormData();
    form.set('nomeDoProfessor', 'ErroPredio');
    form.set('horarioDeAtendimento', 'Segunda 10:00-12:00');
    form.set('periodo', 'integral');
    form.set('sala', '103');
    form.set('predio', JSON.stringify([1, 2]));

    mockedRegister.mockResolvedValueOnce({ status: 'invalid_data' });

    const req = new NextRequest('http://localhost:3000/api/professor', {
      method: 'POST',
      body: form,
    });
    const res = await POST(req);
    const data = await res.json();

    expect(data.status).toBe('invalid_data');
  });

  it('should return invalid_data on malformed formData (get)', async () => {
    const params = { params: { index: '1' } };

    mockedFetch.mockResolvedValueOnce({ status: 'invalid_data' });

    const req = new NextRequest('http://localhost:3000/api/professor', {
      method: 'GET',
    });
    const res = await GET(req, params);
    const data = await res.json();

    expect(data.status).toBe('invalid_data');
  });

  it('should fail to call POST with GET method (invalid Content-Type)', async () => {
    const req = new NextRequest('http://localhost:3000/api/professor', {
      method: 'GET',
    });
  
    try {
      await POST(req);
      throw new Error('Request should have failed');
    } catch (error) {
      expect((error as Error).message).toMatch(/Content-Type/);
    }
  });
  
});
