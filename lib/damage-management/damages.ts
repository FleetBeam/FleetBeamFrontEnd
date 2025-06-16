import { Damage } from "@/types/entities";
import api from "../api";

interface DamagesResponse {
  damages: Damage[];
}

export async function getDamagesByVehicle(vehicleId: number): Promise<Damage[]> {
  try {
    const response = await api.post<DamagesResponse>(`/api/damages/vehicle/${vehicleId}`);
    const data = response.data;
    return data.damages;
  } catch (error) {
    // Add your error handling here
    throw error;
  }
}
