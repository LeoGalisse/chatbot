import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NotepadConfigurationProps {
  playerCount: number;
  marks: string[];
  setMarks: Dispatch<SetStateAction<string[]>>;
  columnLabels: string[];
  setColumnLabels: Dispatch<SetStateAction<string[]>>;
}

export function NotepadConfiguration({ playerCount, marks, setMarks, columnLabels, setColumnLabels }: NotepadConfigurationProps) {
  const [localMarks, setLocalMarks] = useState(marks);
  const [localLabels, setLocalLabels] = useState(columnLabels);

  const handleSave = () => {
    setMarks(localMarks);
    setColumnLabels(localLabels);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Configurações</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar configurações</DialogTitle>
        </DialogHeader>

        {/* Edit MARK Cycle */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="marks" className="text-right">
              Marcadores
            </Label>
            <Input
              id="marks"
              value={localMarks.join(', ')}
              onChange={(e) => setLocalMarks(e.target.value.split(',').map((m) => m.trim()))}
              className="col-span-3"
            />
          </div>

          {/* Edit Column Labels */}
          {Array.from({ length: playerCount }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={`column-${i}`} className="text-right">
                Jogador {i + 1}
              </Label>
              <Input
                id={`column-${i}`}
                value={localLabels[i] || ''}
                onChange={(e) => {
                  const newLabels = [...localLabels];
                  newLabels[i] = e.target.value;
                  setLocalLabels(newLabels);
                }}
                className="col-span-3"
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSave}>Salvar Alterações</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
