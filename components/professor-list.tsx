import { Professor } from '@/models/professor';
import { Period } from '@/models/period';
import { ProfessorCard } from './professor-card';

interface ProfessorListProps {
  professors: Professor[]
  selectedPeriod: Period
}

export const ProfessorList: React.FC<ProfessorListProps> = ({
  professors,
  selectedPeriod,
}) => {
  const filteredProfessors =
    selectedPeriod === 'todos'
      ? professors
      : professors.filter((prof) => prof.periodo === selectedPeriod);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProfessors.length > 0 ? (
        filteredProfessors.map((professor, index) => (
          <ProfessorCard key={index} professor={professor} />
        ))
      ) : (
        <div className="col-span-full text-center py-20 text-gray-400 bg-gray-800/50 rounded-xl">
          Nenhum professor encontrado para o período selecionado.
        </div>
      )}
    </div>
  );
};
