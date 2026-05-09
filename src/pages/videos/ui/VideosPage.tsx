'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/features/auth'
import { useVideos, VideoList, VALID_SORT, VALID_FORMAT } from '@/features/videos'
import type { VideoFilterParams } from '@/features/videos'
import { InfiniteScrollList } from '@/shared/ui/infinite-scroll-list/InfiniteScrollList'
import { SearchAndFilter } from '@/widgets/videos'

export function VideosPage() {
  return (
    <>
      <SearchAndFilter />
      <div className='h-full'>
        <Suspense fallback={<></>}>
          <VideoListSection />
        </Suspense>
      </div>
    </>
  )
}

function VideoListSection() {
  const { user } = useAuth()
  const searchParams = useSearchParams()

  const channelId = user?.userChannelDetails?.youtubeChannelId ?? ''

  const rawSort = searchParams?.get('sort')
  const rawFormat = searchParams?.get('format')

  const sort = VALID_SORT.includes(rawSort as never)
    ? (rawSort as VideoFilterParams['sort'])
    : undefined
  const format = VALID_FORMAT.includes(rawFormat as never)
    ? (rawFormat as VideoFilterParams['format'])
    : undefined
  const isAd = searchParams?.get('isAd') === 'true' || undefined
  const keyword = searchParams?.get('keyword') ?? ''

  const params: VideoFilterParams = {
    ...(sort && { sort }),
    ...(format && { format }),
    ...(isAd && { isAd }),
    ...(keyword && { keyword }),
  }

  const { videos, sentinelRef, isFetchingNextPage, hasNextPage } = useVideos(
    channelId,
    params
  )

  return (
    <InfiniteScrollList
      sentinelRef={sentinelRef}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={!!hasNextPage}>
      <VideoList videos={videos} />
    </InfiniteScrollList>
  )
}
