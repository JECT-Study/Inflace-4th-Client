import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchInfluencers } from '../api/influencerApi'

export function useInfluencers() {
  return useInfiniteQuery({
    queryKey: ['influencers'],
    queryFn: ({ pageParam }) => fetchInfluencers({ cursor: pageParam }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNext ? lastPage.pageInfo.nextCursor : null,
  })
}
