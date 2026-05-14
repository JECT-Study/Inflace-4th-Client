'use client'

import { useEffect } from 'react'
import { MyPageSidebar } from '@/features/me'
import { useSidebarStore } from '@/shared/api'

export function MyChannelsPage() {
  const setOpen = useSidebarStore((state) => state.setOpen)

  useEffect(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <div className='flex size-full bg-background-gray-default'>
      <MyPageSidebar currentPath='/me/channels' />
      <div className='flex h-fit w-full flex-col gap-4'>
        <div className='flex h-fit w-full flex-col gap-16 pt-24 pr-24 pb-16 pl-24'>
          <h1 className='text-ibm-title-lg-normal text-text-and-icon-default'>
            프로필 설정
          </h1>
          <span className='text-noto-body-xxs-normal text-text-and-icon-tertiary'>
            연동된 유튜브 채널을 관리하세요
          </span>
        </div>
        <div>TODO</div>
      </div>
    </div>
  )
}
