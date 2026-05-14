'use client'

import { useEffect } from 'react'
import { MyPageSidebar } from '@/features/me'
import { useSidebarStore } from '@/shared/api'

export function MyProfilePage() {
  const setOpen = useSidebarStore((state) => state.setOpen)

  useEffect(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <div className='flex flex-1'>
      <MyPageSidebar currentPath='/me/profile' />
      <div className='flex-1 px-10 py-8 bg-gray-200' />
    </div>
  )
}
