
import { useState } from 'react';
import { FilterOptions } from '../types';

export const useFilterState = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    subject: 'all',
    topic: 'all',
    status: 'all',
  });
  
  return { filterOptions, setFilterOptions };
};
