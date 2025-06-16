import { useState, useEffect } from "react";
import api from "../../lib/api";
import { Damage } from '@/types/entities';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

async function fetchDamagesByVehicle(vehicleId: number): Promise<Damage[]> {
  try {
    const response = await api.get<Damage[]>(`/api/damages/vehicle/${vehicleId}`);
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch damages');
  }
}


export function useDamagesByVehicle(vehicleId: number) {
  const query = useQuery({
    queryKey: ['damages', vehicleId],
    queryFn: () => fetchDamagesByVehicle(vehicleId),
    enabled: vehicleId > 0,
    staleTime: 1000 * 60 * 5,
  });

  return {
    damages: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
