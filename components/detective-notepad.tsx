'use client';

import { CellMarks } from '@/app/card/page';
import { useEffect, Dispatch, SetStateAction, useState, useRef } from 'react';

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
  playerCount: number;
  cellMarks: CellMarks;
  setCellMarks: Dispatch<SetStateAction<CellMarks>>;
}

export default function DetectiveNotepad({ playerCount, cellMarks, setCellMarks }: DetectiveNotepadProps) {
  const [popover, setPopover] = useState<{ open: boolean; x: number; y: number; section: string; item: string; player: number } | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleCellHold = (event: React.MouseEvent | React.TouchEvent, section: string, item: string, player: number) => {
    event.preventDefault();
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setPopover({
      open: true,
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
      section,
      item,
      player,
    });
  };

  const handleMarkSelection = (mark: string) => {
    if (!popover) return;

    setCellMarks((prev) => {
      const sectionMarks = { ...prev[popover.section] };
      const cellId = `${popover.item}-${popover.player}`;

      if (mark === '') {
        delete sectionMarks[cellId];
      } else {
        sectionMarks[cellId] = mark;
      }

      return {
        ...prev,
        [popover.section]: sectionMarks,
      };
    });

    setPopover(null);
  };

  // Hook to manage click & hold events
  // eslint-disable-next-line no-unused-vars
  const useClickAndHold = (onClick: () => void, onHold: (e: React.MouseEvent | React.TouchEvent) => void, holdDuration = 500) => {
    return {
      onMouseDown: (e: React.MouseEvent) => {
        timeoutRef.current = setTimeout(() => onHold(e), holdDuration);
      },
      onMouseUp: () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          onClick();
        }
      },
      onMouseLeave: () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      },
      onTouchStart: (e: React.TouchEvent) => {
        timeoutRef.current = setTimeout(() => onHold(e), holdDuration);
      },
      onTouchEnd: () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          onClick();
        }
      },
    };
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
          {Array.from({ length: playerCount }).map((_, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const handlers = useClickAndHold(() => handleCellClick(section, item, i), (e) => handleCellHold(e, section, item, i));

            return (
              <div
                key={i}
                className="p-2 text-center border border-border hover:bg-accent cursor-pointer select-none"
                {...handlers}
              >
                {getCellMark(section, item, i)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full space-y-5">
      {renderSection('QUEM?', 'suspects')}
      {renderSection('QUAL ARMA?', 'weapons')}
      {renderSection('ONDE?', 'rooms')}

      {popover && (
        <div
          className="absolute bg-white border border-gray-300 shadow-lg p-2 rounded-md z-50"
          style={{ left: popover.x, top: popover.y }}
        >
          <div className="grid grid-cols-3 gap-2">
            {MARK_CYCLE.map((mark) => (
              <button
                key={mark}
                className="p-2 border rounded hover:bg-gray-200"
                onClick={() => handleMarkSelection(mark)}
              >
                {mark || '⛔'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
