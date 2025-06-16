import api from "../../lib/api";
import { Subcategory } from '@/types/entities';
import { useQuery } from '@tanstack/react-query';


async function fetchSubcategories(): Promise<Subcategory[]> {
  try {
    const response = await api.get<Subcategory[]>(`/api/subcategories`);
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch damages');
  }
}

export function useSubcategories() {
  const query = useQuery({
    queryKey: ['subcategories'],
    queryFn: () => fetchSubcategories(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    subcategories: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
