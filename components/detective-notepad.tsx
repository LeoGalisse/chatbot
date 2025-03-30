'use client';

import { CellMarks } from '@/app/card/page';
import { useEffect, Dispatch, SetStateAction } from 'react';

const gameData = {
  suspects: ['Green', 'Mostarda', 'Pavão', 'Ameixa', 'Escarlate', 'White'],
  weapons: ['Castiçal', 'Faca', 'Cano', 'Revólver', 'Corda', 'Chave Inglesa'],
  rooms: [
    'Salão de Festas',
    'Salão de Jogos',
    'Sala de Música',
    'Sala de Jantar',
    'Hall',
    'Cozinha',
    'Biblioteca',
    'Sala',
    'Escritório',
  ],
};

const MARK_CYCLE = ['X', 'O', '?', '✓', '!', '-', ''];

interface DetectiveNotepadProps {
  playerCount: number
  cellMarks: CellMarks
  setCellMarks: Dispatch<SetStateAction<CellMarks>>
}

export default function DetectiveNotepad({ playerCount, cellMarks, setCellMarks }: DetectiveNotepadProps) {
  

  useEffect(() => {
    const savedMarks = localStorage.getItem('clueNotepadMarks');
    if (savedMarks) {
      setCellMarks(JSON.parse(savedMarks));
    }
  }, [setCellMarks]);

  useEffect(() => {
    localStorage.setItem('clueNotepadMarks', JSON.stringify(cellMarks));
  }, [cellMarks]);

  const handleCellClick = (section: string, item: string, player: number) => {
    const cellId = `${item}-${player}`;

    setCellMarks((prev) => {
      const sectionMarks = { ...prev[section] };
      const currentMark = sectionMarks[cellId] || '';
      const currentIndex = MARK_CYCLE.indexOf(currentMark);
      const nextIndex = (currentIndex + 1) % MARK_CYCLE.length;
      const nextMark = MARK_CYCLE[nextIndex];

      if (nextMark === '') {
        delete sectionMarks[cellId];
      } else {
        sectionMarks[cellId] = nextMark;
      }

      return {
        ...prev,
        [section]: sectionMarks,
      };
    });
  };

  const getCellMark = (section: string, item: string, player: number) => {
    const cellId = `${item}-${player}`;
    return cellMarks[section][cellId] || '';
  };

  const renderTableSection = (title: string, section: keyof typeof gameData) => (
    <>
      <thead>
        <tr className="bg-primary text-primary-foreground font-bold">
          <th className="p-2 border border-border">{title}</th>
          {Array.from({ length: playerCount }).map((_, i) => (
            <th key={i} className="p-2 border border-border text-center">{i + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {gameData[section].map((item) => (
          <tr key={item}>
            <td className="p-2 border border-border font-bold">{item}</td>
            {Array.from({ length: playerCount }).map((_, i) => (
              <td
                key={i}
                className="p-2 text-center border border-border hover:bg-accent cursor-pointer"
                onClick={() => handleCellClick(section, item, i)}
              >
                {getCellMark(section, item, i)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse border border-border">
        {renderTableSection('QUEM?', 'suspects')}
        {renderTableSection('QUAL ARMA?', 'weapons')}
        {renderTableSection('ONDE?', 'rooms')}
      </table>
    </div>
  );
}
