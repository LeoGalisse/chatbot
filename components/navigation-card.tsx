import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavigationCardProps {
  title: string
  description: string
  icon: LucideIcon
  color: string
  link: string
}

export const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  link,
}) => {
  return (
    <a
      href={link}
      className={`p-6 rounded-xl shadow-md cursor-pointer transition-all duration-300 
                 hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800 bg-white
                 flex flex-col items-center md:items-start text-center md:text-left`}
    >
      <div className={`p-3 rounded-full mb-4 ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2 dark:text-white text-gray-800">
        {title}
      </h3>
      <p className="text-sm dark:text-gray-300 text-gray-600">{description}</p>
    </a>
  );
};
