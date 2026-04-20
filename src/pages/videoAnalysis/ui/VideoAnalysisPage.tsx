'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/features/auth'
import { useVideoAnalysis, VideoList } from '@/features/videoAnalysis'
import { SearchAndFilter } from '@/widgets/videoAnalysis'

export function VideoAnalysisPage() {
  const router = useRouter()
  const { isLoggedIn, isInitializing, user } = useAuth()

  /* 유저가 유튜브 채널을 연동하지 않았다면 /으로 리다이렉트 */
  useEffect(() => {
    if (!isInitializing && !isLoggedIn && !user?.id) {
      router.replace('/')
    }
  }, [isInitializing, isLoggedIn, user?.id, router])

  const channelId = user?.id ?? ''
  const { data } = useVideoAnalysis(channelId)

  return (
    <>
      <SearchAndFilter />
      <VideoList videos={data?.videos ?? []} />
    </>
  )
}
