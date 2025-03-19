
import React from 'react';
import { cn } from '@/lib/utils';
import { Status } from '@/types';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const badgeClasses = {
    correct: 'bg-correct/20 text-correct border-correct/30',
    wrong: 'bg-wrong/20 text-wrong border-wrong/30',
    unattempted: 'bg-unattempted/20 text-unattempted border-unattempted/30'
  };
  
  const statusLabels = {
    correct: 'Correct',
    wrong: 'Wrong',
    unattempted: 'Unattempted'
  };
  
  return (
    <div className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
      badgeClasses[status],
      className
    )}>
      {statusLabels[status]}
    </div>
  );
};

export default StatusBadge;
