'use client';

import { PeriodFilter } from '@/components/period-filter';
import { ProfessorList } from '@/components/professor-list';
import { Professor } from '@/models/professor';
import React, { useEffect, useState } from 'react';
import { listAllProfessors } from './actions';
import { CreateProfessorDialog } from '@/components/professor-dialog';

export default function Professors() {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('todos');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data, status } = await listAllProfessors();

        if (data) {
          setProfessors(data as Professor[]);
        } else {
          throw new Error(status);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="container mx-auto px-4 py-24">
        <CreateProfessorDialog setProfessors={setProfessors} />
        <div className="max-w-6xl mx-auto">
          <PeriodFilter
            selectedPeriod={selectedPeriod}
            onPeriodChange={handlePeriodChange}
          />
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <ProfessorList
              professors={professors}
              selectedPeriod={selectedPeriod}
            />
          )}
        </div>
      </main>
    </div>
  );
}
