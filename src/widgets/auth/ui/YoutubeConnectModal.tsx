'use client'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'
import { useYoutubeConnectModal, useConnectChannel } from '@/features/auth'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import YouTubeIcon from '@/shared/assets/youtube.svg?react'

export function YoutubeConnectModal() {
  const isOpen = useYoutubeConnectModal((s) => s.isOpen)
  const close = useYoutubeConnectModal((s) => s.close)

  const { mutate: connect, isPending, error } = useConnectChannel()

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogOverlay className='bg-background-dim-default' />
      <DialogContent
        showCloseButton={false}
        className='flex w-full max-w-[38.4rem] flex-col items-center gap-40 rounded-16 bg-white p-40 lg:max-w-[56rem]'>
        <VisuallyHidden>
          <DialogTitle>유튜브 채널 연동하기</DialogTitle>
        </VisuallyHidden>

        {/* 헤더: 제목 + 설명 */}
        <div className='flex w-full flex-col items-center gap-16'>
          <h2 className='text-center text-noto-title-sm-bold text-text-and-icon-primary'>
            유튜브 채널 연동하기
          </h2>
          <p className='text-center text-noto-body-xs-normal text-text-and-icon-secondary'>
            채널을 연동하고 내 채널 데이터 분석 및 인플루언서 분석 기능을
            사용해보세요.
          </p>
        </div>

        {/* 목업 이미지 (데스크탑 전용) */}
        <div className='hidden w-full lg:block'>
          <div className='h-[28rem] w-full rounded-8 bg-background-gray-default' />
        </div>

        {/* 버튼 영역 */}
        <div className='flex w-full flex-col items-center gap-24'>
          <button
            type='button'
            onClick={() => connect()}
            disabled={isPending}
            className='flex h-[5.4rem] w-full items-center justify-center gap-16 rounded-6 border border-stroke-border-gray-stronger bg-white transition-colors disabled:pointer-events-none disabled:opacity-50'>
            <span className='flex size-24 shrink-0 items-center justify-center *:size-full'>
              <YouTubeIcon />
            </span>
            <span className='text-ibm-label-lg-bold text-text-and-icon-primary'>
              {isPending ? '연동 중...' : 'Continue with YouTube'}
            </span>
          </button>

          {error && (
            <p className='text-noto-label-sm-normal text-destructive'>
              {error.message}
            </p>
          )}

          <button
            type='button'
            onClick={close}
            disabled={isPending}
            className='text-noto-label-md-normal text-text-and-icon-secondary transition-colors hover:text-text-and-icon-primary disabled:pointer-events-none disabled:opacity-50'>
            나중에 할래요
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
