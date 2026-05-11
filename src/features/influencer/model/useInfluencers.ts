import { useQueryClient } from '@tanstack/react-query'

import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'
import type { Influencer } from '@/entities/influencer'
import type { InfiniteData } from '@tanstack/react-query'

import {
  fetchInfluencers,
  addBookmark,
  removeBookmark,
} from '../api/influencerApi'
import type { InfluencerListResponse, FetchInfluencersParams } from '../api/influencerApi'

export function useInfluencers(filters?: Omit<FetchInfluencersParams, 'cursor'>) {
  return useInfiniteScroll({
    queryKey: ['influencers', filters],
    queryFn: ({ pageParam }) =>
      fetchInfluencers({ ...filters, cursor: pageParam }),
  })
}

/* 클릭 시 TanStack Query 캐시를 즉시 업데이트 후 API 호출 */
export function useBookmarkToggle() {
  const queryClient = useQueryClient()

  return (channelId: number, bookmarked: boolean) => {
    queryClient
      .getQueryCache()
      .findAll({ queryKey: ['influencers'] })
      .forEach(({ queryKey }) => {
        queryClient.setQueryData<InfiniteData<InfluencerListResponse>>(
          queryKey,
          (prev) => {
            if (!prev) return prev
            return {
              ...prev,
              pages: prev.pages.map((page) => ({
                ...page,
                content: page.content.map((influencer: Influencer) =>
                  influencer.channelId === channelId
                    ? { ...influencer, bookmarked }
                    : influencer
                ),
              })),
            }
          }
        )
      })

    void (bookmarked ? addBookmark(channelId) : removeBookmark(channelId))
  }
}
