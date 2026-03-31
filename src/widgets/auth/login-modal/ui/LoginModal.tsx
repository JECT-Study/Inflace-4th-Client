'use client'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog'
import {
  SocialLoginButton,
  useLoginModal,
  usePopupOAuth,
} from '@/features/auth'
import GoogleIcon from '@/features/auth/ui/social-login/assets/google-icon.svg'
import YouTubeIcon from '@/features/auth/ui/social-login/assets/youtube-icon.svg'

export function LoginModal() {
  const isOpen = useLoginModal((s) => s.isOpen)
  const close = useLoginModal((s) => s.close)

  const youtube = usePopupOAuth({
    apiPath: '/api/auth/google',
    popupName: 'youtube-login',
  })
  const google = usePopupOAuth({
    apiPath: '/api/auth/google',
    popupName: 'google-login',
  })

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogOverlay className='bg-background-dim-default' />
      <DialogContent
        showCloseButton={false}
        className='flex h-170 w-140 shrink-0 flex-col items-center justify-center gap-80 rounded-16 bg-white px-40 py-80 sm:min-h-170 sm:min-w-140'>
        {/* title containter */}
        <div className='flex h-fit w-full flex-col items-center justify-center gap-16'>
          {/* TODO: fl 로고 에셋으로 교체 */}
          <div className='flex h-[55.33] w-41.5 items-center justify-center rounded-2xl bg-brand-primary text-2xl font-bold text-white'>
            fl
          </div>

          {/* 메인 문구 */}
          <DialogTitle className='size-fit text-center text-body-xs leading-(--leading-body-md) font-medium tracking-[-1%] text-text-and-icon-default'>
            인플루언서 탐색, 채널 분석, 콘텐츠 분석까지 모두 경험하세요
          </DialogTitle>
        </div>

        {/* 로그인 버튼 + 이용약관*/}
        <div className='flex h-fit w-full flex-col items-center justify-center gap-64'>
          <div className='flex size-fit flex-col gap-24'>
            <SocialLoginButton
              icon={<YouTubeIcon />}
              label={
                youtube.isLoading ? '로그인 중...' : 'Continue with YouTube'
              }
              onClick={youtube.handleClick}
              disabled={youtube.isLoading}
            />
            {youtube.error && (
              <p className='text-sm text-destructive'>{youtube.error}</p>
            )}

            <SocialLoginButton
              icon={<GoogleIcon />}
              label={google.isLoading ? '로그인 중...' : 'Continue with Google'}
              onClick={google.handleClick}
              disabled={google.isLoading}
            />
            {google.error && (
              <p className='text-sm text-destructive'>{google.error}</p>
            )}
          </div>

          {/* 하단 링크 */}
          <div className='flex size-fit items-center justify-center gap-16 text-caption-sm leading-(--leading-caption-sm) text-text-and-icon-tertiary'>
            <span>이용약관</span>
            <span>개인정보처리방침</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
