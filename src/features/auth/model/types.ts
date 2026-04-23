import type { UserDetails, UserChannelDetails } from '@/shared/api/types'

/* 로그인 모달 상태 */
export interface LoginModalState {
  isOpen: boolean
  open: () => void
  close: () => void
}

export interface PopupOAuthConfig {
  apiPath: string
  popupName: string
}

/* 로그인 에러 형식 */
export interface LoginErrorDetail {
  code: string
  message: string
}

/* 로그인 API 응답 형식 */
export interface LoginResponse {
  responseDto:
    | {
        accessToken: string
        userDetails: UserDetails
        userChannelDetails: UserChannelDetails | null
      }
    | string
  error: LoginErrorDetail | null
  success: boolean
}
