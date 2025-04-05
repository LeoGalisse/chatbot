import React from 'react';

interface PeriodFilterProps {
  selectedPeriod: string
  // eslint-disable-next-line no-unused-vars
  onPeriodChange: (period: string) => void
}

export const PeriodFilter: React.FC<PeriodFilterProps> = ({
  selectedPeriod,
  onPeriodChange,
}) => {
  return (
    <div className="mb-10 flex flex-col items-center">
      <label
        htmlFor="period-filter"
        className="text-xl font-medium mb-4 text-secondary-foreground"
      >
        Filtrar por período
      </label>
      <div className="flex gap-4">
        {(['todos', 'integral', 'noturno'] as const).map((period) => (
          <button
            key={period}
            onClick={() => onPeriodChange(period)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 
              ${selectedPeriod === period ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg scale-105' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};
