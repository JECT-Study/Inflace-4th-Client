'use client'

import { AuthStatusButton } from '@/features/auth'
import { OnboardingButton } from '@/features/onboarding'
import { Logo } from '@/shared/ui/Logo'

// 로그인 상태에 따라 이모티콘 보이고 안보이고 변경 필요

export function Header() {
  return (
    <>
      <header className='sticky top-0 z-11 h-header-height'>
        <div className='absolute top-0 left-0 flex h-header-height w-full items-center border-b border-sidebar-border bg-white px-34'>
          <div className='flex shrink-0 basis-full items-center justify-between'>
            <Logo variant='header' />
            <div className='flex items-center gap-x-16'>
              {/* 임시 온보딩 버튼 */}
              <OnboardingButton />
              <AuthStatusButton />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
