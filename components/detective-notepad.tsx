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

  const renderSection = (title: string, section: keyof typeof gameData) => (
    <div className='overflow-x-auto'>
      <div
        style={{
          gridTemplateColumns: `150px repeat(${playerCount}, minmax(50px, 1fr))`,
        }}
        className="grid text-primary-foreground font-bold"
      >
        <div className="p-2 border border-border bg-primary">{title}</div>
        {Array.from({ length: playerCount }).map((_, i) => (
          <div key={i} className="p-2 text-center border border-border bg-primary">
            {i + 1}
          </div>
        ))}
      </div>

      {gameData[section].map((item) => (
        <div 
          key={item} 
          style={{
            gridTemplateColumns: `150px repeat(${playerCount}, minmax(50px, 1fr))`,
          }} 
          className={'grid'}
        >
          <div className="p-2 border border-border">{item}</div>
          {Array.from({ length: playerCount }).map((_, i) => (
            <div
              key={i}
              className="p-2 text-center border border-border hover:bg-accent cursor-pointer select-none"
              onClick={() => handleCellClick(section, item, i)}
            >
              {getCellMark(section, item, i)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full space-y-5">
      {renderSection('QUEM?', 'suspects')}
      {renderSection('QUAL ARMA?', 'weapons')}
      {renderSection('ONDE?', 'rooms')}
    </div>
  );
}
