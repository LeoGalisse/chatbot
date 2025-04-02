import { getBuilding } from '@/lib/format-buildings';
import { Professor } from '@/models/professor';
import { ClockIcon, BuildingIcon, MapPinIcon, UserIcon } from 'lucide-react';

interface ProfessorCardProps {
  professor: Professor
}
export const ProfessorCard: React.FC<ProfessorCardProps> = ({ professor }) => {
  const predio = getBuilding(professor.sala);
  return (
    <div className="group relative bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-purple-400" />
            {professor.nomeDoProfessor}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium 
            ${professor.periodo === 'integral' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'}`}
          >
            {professor.periodo === 'integral' ? 'Integral' : 'Noturno'}
          </span>
        </div>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-center gap-3 bg-gray-700/30 p-3 rounded-lg">
            <ClockIcon className="w-5 h-5 text-purple-400" />
            <span>{professor.horarioDeAtendimento}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-gray-700/30 p-3 rounded-lg">
              <BuildingIcon className="w-5 h-5 text-blue-400" />
              <span>Prédio {predio}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-700/30 p-3 rounded-lg">
              <MapPinIcon className="w-5 h-5 text-blue-400" />
              <span>Sala {professor.sala}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
