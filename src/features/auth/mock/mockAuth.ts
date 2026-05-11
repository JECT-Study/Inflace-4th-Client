import {
  mockAccessToken,
  mockUserDetails,
  mockUserChannelDetails,
} from '@/shared/api/mock/mockUser'

import type { LoginResponse } from '../model/types'
import type { ApiResponse } from '@/shared/api/types'

/* 로그인 응답 DTO */
const mockLoginResponseDto = {
  accessToken: mockAccessToken,
  userDetails: mockUserDetails,
  userChannelDetails: mockUserChannelDetails,
}

/* 로그인 응답 */
export const mockLoginResponse: LoginResponse = {
  success: true,
  responseDto: mockLoginResponseDto,
  error: null,
}

/* 리프레시 응답 */
export const mockReissueResponse: ApiResponse<{ accessToken: string } | string> = {
  success: true,
  responseDto: { accessToken: mockAccessToken },
  error: null,
}

/* 실패 응답 */
export const mockLoginErrorResponse: LoginResponse = {
  success: false,
  responseDto: 'string',
  error: {
    code: 'AUTH_401',
    message: 'Bad Request: Unsupported OAuth Provider',
  },
}
