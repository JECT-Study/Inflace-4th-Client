'use client'

import { Suspense } from 'react'
import { InfluencerList, useInfluencers } from '@/features/influencer'
import { InfluencerFilter } from '@/widgets/influencer'

export function InfluencerPage() {
  return (
    <div className='flex h-fit w-full flex-col gap-24 pb-[9.6rem]'>
      <InfluencerFilter />
      <div className='h-full'>
        <Suspense fallback={<></>}>
          <InfluencerListSection />
        </Suspense>
      </div>
    </div>
  )
}

function InfluencerListSection() {
  const {
    data,
    isLoading,
    isError,
    sentinelRef,
    isFetchingNextPage,
    hasNextPage,
  } = useInfluencers()

  const influencers = data?.pages.flatMap((page) => page.content) ?? []

  if (isLoading) {
    return (
      <div className='text-noto-label-sm-medium px-24 text-text-and-icon-tertiary'>
        불러오는 중...
      </div>
    )
  }

  if (isError) {
    return (
      <div className='text-noto-label-sm-medium text-status-error px-24'>
        조건에 맞는 인플루언서가 없습니다.
      </div>
    )
  }

  return (
    <InfluencerList
      influencers={influencers}
      sentinelRef={sentinelRef}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={!!hasNextPage}
    />
  )
}
