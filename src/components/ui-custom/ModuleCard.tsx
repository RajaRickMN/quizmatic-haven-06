
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { cn } from '@/lib/utils';
import { useLearning } from '@/context/LearningContext';
import { ModuleType } from '@/types';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  delay: number;
  moduleType: ModuleType;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  title, 
  description, 
  icon, 
  path, 
  delay,
  moduleType
}) => {
  const navigate = useNavigate();
  const { setCurrentModule } = useLearning();
  
  const handleClick = () => {
    setCurrentModule(moduleType);
    navigate(path);
  };

  return (
    <div 
      className={cn(
        'opacity-0',
        'animate-fade-up',
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <Card 
        className="h-full flex flex-col transition-all duration-500 hover:scale-105 hover:shadow-lg"
        onClick={handleClick}
      >
        <div className="rounded-full p-4 bg-primary/10 mb-4 w-fit">
          <div className="text-primary w-6 h-6">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </Card>
    </div>
  );
};

export default ModuleCard;
