import { useQuery } from '@tanstack/react-query'

import { fetchChannelProfile } from '../api/channelProfileApi'

export function useChannelProfile(id: string | null) {
  return useQuery({
    queryKey: ['channelProfile', id],
    queryFn: () => fetchChannelProfile(),
    enabled: !!id,
  })
}
