import { useState, useEffect } from "react";
import api from "../../lib/api";
import { User } from '@/types/entities';
import { useQuery } from '@tanstack/react-query';


async function fetchMyUser(): Promise<User> {
  try {
    const response = await api.get<User>(`/api/users/myuser`);
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch damages');
  }
}

export function useMyUser() {
  const query = useQuery({
    queryKey: ['myUser'],
    queryFn: () => fetchMyUser(),
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}


