'use client'

export const SIDEBAR_ITEMS = [
  { label: '프로필 설정', href: '/me/profile' },
  { label: '채널 연동', href: '/me/channels' },
  { label: '구독·결제', href: '/me/credit' },
  { label: '알림 설정', href: '/me/alarm' },
] as const

type MyPageSidebarProps = {
  currentPath: string
}

export function MyPageSidebar({ currentPath }: MyPageSidebarProps) {
  return (
    <div className='bg-red-500 min-h-screen w-60 shrink-0' />
  )
}
