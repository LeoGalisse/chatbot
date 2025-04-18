'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import DetectiveNotepad from '@/components/detective-notepad';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NotepadConfiguration } from '@/components/notepad-configurations';

export type CellMarks = {
  [key: string]: {
    [key: string]: string
  }
}

export default function Card() {
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [cellMarks, setCellMarks] = useState<CellMarks>({
    suspects: {},
    weapons: {},
    rooms: {},
  });
  const [marks, setMarks] = useState<string[]>(['X', 'O', '?', '✓', '!', '-', '']);
  const [columnLabels, setColumnLabels] = useState<string[]>([]);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-primary">Clue Detective Notepad</h1>
        </div>

        <div className="w-full bg-card rounded-lg shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium">Number of Players:</span>
              <Select value={playerCount.toString()} onValueChange={(value: string) => setPlayerCount(Number.parseInt(value))}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Players" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 11 }).map((_, i) => (
                    <SelectItem
                      key={i}
                      value={(i + 2).toString()}
                    >
                      {i + 2}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                Print
              </Button>
              <Button variant="destructive" size="sm" id="reset-button" onClick={() => setCellMarks({
                suspects: {},
                weapons: {},
                rooms: {},
              })}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset All
              </Button>
              <NotepadConfiguration playerCount={playerCount} marks={marks} setMarks={setMarks} columnLabels={columnLabels} setColumnLabels={setColumnLabels} />
            </div>
          </div>

          <DetectiveNotepad playerCount={playerCount} cellMarks={cellMarks} setCellMarks={setCellMarks} marks={marks} columnLabels={columnLabels} />
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Click on cells to cycle through marks (X → O → ? → ✓ → ! → - → empty).</p>
          <p className="mt-2">Based on the classic board game Clue/Cluedo.</p>
        </div>
      </div>
    </main>
  );
}

