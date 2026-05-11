import type { Influencer } from '@/entities/influencer'
import { InfluencerCard } from '@/entities/influencer'
import { InfiniteScrollList } from '@/shared/ui/infinite-scroll-list/InfiniteScrollList'
import { formatComma } from '@/shared/lib/format'
import { useBookmarkToggle } from '../model/useInfluencers'

interface InfluencerListProps {
  influencers: Influencer[]
  sentinelRef: React.RefCallback<HTMLDivElement | null>
  isFetchingNextPage: boolean
  hasNextPage: boolean
}

export function InfluencerList({
  influencers,
  sentinelRef,
  isFetchingNextPage,
  hasNextPage,
}: InfluencerListProps) {
  const toggleBookmark = useBookmarkToggle()

  return (
    <div className='flex h-fit w-full flex-col gap-16 px-24'>
      {/* 검색 결과 및 정렬 기준
       * TODO: 인원수 및 정렬기준 구현
       */}
      <div className='flex h-fit w-full justify-between text-noto-label-sm-bold'>
        <span className='gap-10 px-2 text-text-and-icon-primary'>
          검색결과 {formatComma(38973842)}명
        </span>

        {/* 정렬기준 */}
        <div className='flex size-fit text-brand-secondary'>
          <span className='size-fit px-8 py-4'>구독자 많은 순</span>
          <span className='size-fit px-8 py-4'>구독자 많은 순</span>
          <span className='size-fit px-8 py-4'>구독자 많은 순</span>
          <span className='size-fit px-8 py-4'>구독자 많은 순</span>
        </div>
      </div>

      <InfiniteScrollList
        sentinelRef={sentinelRef}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}>
        <div className='grid h-fit w-full grid-cols-[repeat(auto-fill,minmax(52.1rem,1fr))] gap-24'>
          {influencers.map((influencer) => (
            <InfluencerCard
              key={influencer.channelId}
              influencer={influencer}
              onBookmarkToggle={(bookmarked) =>
                toggleBookmark(influencer.channelId, bookmarked)
              }
            />
          ))}
        </div>
      </InfiniteScrollList>
    </div>
  )
}
