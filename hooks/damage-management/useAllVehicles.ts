import { useState, useEffect } from "react";
import api from "../../lib/api";
import { Vehicle } from '@/types/entities';



export function useAllVehicles() {
  const [vehicles, setDamages] = useState<Vehicle[]>([]);
  const [vehiclesLoading, setLoading] = useState(false);
  const [vehiclesError, setError] = useState<string | null>(null);

  useEffect(() => {

    async function fetchDamages() {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get<Vehicle[]>(`/api/vehicles`);
        setDamages(response.data);
      } catch (err) {
        setError("Failed to load damages");
      } finally {
        setLoading(false);
      }
    }

    fetchDamages();
  }, []);

  return { vehicles, vehiclesLoading, vehiclesError };
}
