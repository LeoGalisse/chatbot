'use client';

import { PeriodFilter } from '@/components/period-filter';
import { ProfessorList } from '@/components/professor-list';
import { Period } from '@/models/period';
import { Professor } from '@/models/professor';
import React, { useEffect, useState } from 'react';
import { professors as professorsData } from '@/lib/professor';

export default function Professors() {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('todos');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setProfessors(professorsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePeriodChange = (period: Period) => {
    setSelectedPeriod(period);
  };
  
  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="container mx-auto px-4 py-24">
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
