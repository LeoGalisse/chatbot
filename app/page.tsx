'use client';

import React from 'react';
import { MessageSquareIcon, ClipboardListIcon, UserIcon } from 'lucide-react';
import { NavigationCard } from '@/components/navigation-card';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-background">
      <main className="flex-grow container mx-auto px-4 py-24">
        <section className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white text-gray-800">
            Welcome to my dump
          </h2>
          <p className="text-lg max-w-2xl mx-auto dark:text-gray-300 text-gray-600">
            Every project i have started and maybe finished
          </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <NavigationCard
            title="Chatbot"
            description="Interact with my quiz bot"
            icon={MessageSquareIcon}
            color="bg-blue-500"
            link={'/chatbot'}
          />
          <NavigationCard
            title="Clue Card"
            description="Card template for the game clue"
            icon={ClipboardListIcon}
            color="bg-green-500"
            link={'/card'}
          />
          <NavigationCard
            title="Professors"
            description="View professors and their availability"
            icon={UserIcon}
            color="bg-purple-500"
            link={'/professors'}
          />
        </section>
      </main>
    </div>
  );
};
