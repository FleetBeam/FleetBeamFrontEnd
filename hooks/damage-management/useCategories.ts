import api from "../../lib/api";
import { Category } from '@/types/entities';
import { useQuery } from '@tanstack/react-query';


async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await api.get<Category[]>(`/api/categories`);
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch damages');
  }
}

export function useCategories() {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    categories: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
