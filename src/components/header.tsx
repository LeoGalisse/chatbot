'use client';

import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between transition-colors duration-300 bg-sidebar absolute">
      <div className="flex items-center">
        <h1 className="text-xl md:text-2xl font-bold transition-colors text-primary">
          Galisses
        </h1>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <MoonIcon className="w-5 h-5 text-gray-700" />
        ) : (
          <SunIcon className="w-5 h-5 text-yellow-300" />
        )}
      </button>
    </header>
  );
};
