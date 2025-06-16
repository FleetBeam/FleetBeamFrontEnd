import { useState, useEffect } from "react";
import api from "../../lib/api";
import { Damage } from '@/types/entities';



export function useDamagesByVehicle(vehicleId: number | null) {
  const [damages, setDamages] = useState<Damage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (vehicleId === null) return; // or handle no id case

    async function fetchDamages() {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get<Damage[]>(`/api/damages/vehicle/${vehicleId}`);
        setDamages(response.data);
      } catch (err) {
        setError("Failed to load damages");
      } finally {
        setLoading(false);
      }
    }

    fetchDamages();
  }, [vehicleId]);

  return { damages, loading, error };
}
