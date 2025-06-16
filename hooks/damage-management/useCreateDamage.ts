import { DamageDTO } from '@/types/entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'lib/api';

export function useCreateDamage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newDamageDTO: DamageDTO) =>
      api.post('/api/damages', newDamageDTO).then(response => response.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['damages'] });
    },
  });
}
