import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'

import { fetchInfluencers } from '../api/influencerApi'

export function useInfluencers() {
  return useInfiniteScroll({
    queryKey: ['influencers'],
    queryFn: ({ pageParam }) => fetchInfluencers({ cursor: pageParam }),
  })
}
