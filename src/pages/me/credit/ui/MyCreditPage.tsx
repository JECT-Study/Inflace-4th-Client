'use client'

import { useEffect } from 'react'
import { MyPageSidebar } from '@/features/me'
import { useSidebarStore } from '@/shared/api'

export function MyCreditPage() {
  const setOpen = useSidebarStore((state) => state.setOpen)

  useEffect(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <div className='flex size-full bg-background-gray-default'>
      <MyPageSidebar currentPath='/me/credit' />
      <div className='flex-1 bg-gray-200 px-10 py-8' />
    </div>
  )
}
