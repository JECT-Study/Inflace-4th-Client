'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/features/auth/model/useAuth'
import { useLoginModal } from '@/features/auth'
import { FeatureSection, HeroMain, PlansSection } from '@/widgets/home'

export default function HomePage() {
  /* 유저가 로그인 한 후라면 해당 페이지가 아닌
   * main 페이지를 렌더링함
   */
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isLoggedIn, isInitializing, user } = useAuth()
  const openLoginModal = useLoginModal((s) => s.open)

  useEffect(() => {
    if (!isInitializing && isLoggedIn && user?.id) {
      router.replace(`/main`)
    }
  }, [isInitializing, isLoggedIn, user?.id, router])

  useEffect(() => {
    // proxy.ts가 미로그인 보호 경로 접근을 홈(/)으로 보낼 때 ?from=protected 쿼리를 붙임
    // 초기화 완료 후 미로그인 상태이고 해당 쿼리가 있으면 로그인 모달을 자동 오픈
    if (!isInitializing && !isLoggedIn && searchParams?.get('from') === 'protected') {
      openLoginModal()
    }
  }, [isInitializing, isLoggedIn, searchParams, openLoginModal])

  /* auth 초기화 완료 후 snap 클래스를 추가하도록 함
   * isInitializing 중에 snap을 활성화하면 컨텐츠 렌더 시점에 snap-start로 강제 스크롤됨
   * 로딩 중 스클롤을 인식해 화면 최하단으로 랜더링 되는 것을 방지함.
   */
  useEffect(() => {
    if (isInitializing) return
    document.documentElement.classList.add('snap-landing')
    const footer = document.querySelector('footer')
    footer?.classList.add('snap-start')
    return () => {
      document.documentElement.classList.remove('snap-landing')
      footer?.classList.remove('snap-start')
    }
  }, [isInitializing])

  if (isInitializing || (isLoggedIn && user?.id)) return null

  return (
    <>
      <HeroMain />
      <div className='snap-start'>
        <section className='grid grid-cols-1 gap-(--spacing-md) px-(--spacing-md) py-56 md:grid-cols-2 lg:grid-cols-3'>
          <FeatureSection />
        </section>
        <section className='px-(--spacing-md) py-56'>
          <PlansSection />
        </section>
      </div>
    </>
  )
}
