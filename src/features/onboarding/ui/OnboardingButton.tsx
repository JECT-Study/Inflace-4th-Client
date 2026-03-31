'use client'

import { Button } from '@/shared/ui/button'

import { useOnboardingModal } from '../model/useOnboardingModal'

export function OnboardingButton() {
  const openModal = useOnboardingModal((s) => s.open)
  return (
    // 온보딩 모달 임시 버튼
    <Button color='secondary' size='sm' style='filled' onClick={openModal}>
      <span className='text-label-sm'>Onboarding</span>
    </Button>
  )
}
