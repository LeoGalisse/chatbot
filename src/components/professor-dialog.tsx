'use client';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { listAllProfessors, registerProfessor } from '@/app/(inatel)/professors/actions';
import { Professor } from '@/models/professor';

interface CreateProfessorDialogProps {
  setProfessors: React.Dispatch<React.SetStateAction<Professor[]>>
}

export function CreateProfessorDialog({ setProfessors }: CreateProfessorDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    nomeDoProfessor: '',
    horarioDeAtendimento: '',
    periodo: 'integral',
    sala: '',
    predio: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.set('nomeDoProfessor', form.nomeDoProfessor);
    formData.set('horarioDeAtendimento', form.horarioDeAtendimento);
    formData.set('periodo', form.periodo);
    formData.set('sala', form.sala);
  
    const response = await registerProfessor({ status: 'idle' }, formData);
    
    
    if (response.status === 'success') {
      const { data } = await listAllProfessors();
      setProfessors(data as Professor[]);
      setOpen(false);
    } else {
      console.error('Erro ao registrar professor:', response.status);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Novo Professor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Professor</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="nomeDoProfessor">Nome</Label>
            <Input name="nomeDoProfessor" onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="horarioDeAtendimento">Horário de Atendimento</Label>
            <Input name="horarioDeAtendimento" onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="periodo">Período</Label>
            <select name="periodo" onChange={handleChange} className="border rounded px-3 py-2">
              <option value="integral">Integral</option>
              <option value="noturno">Noturno</option>
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sala">Sala</Label>
            <Input name="sala" onChange={handleChange} />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
