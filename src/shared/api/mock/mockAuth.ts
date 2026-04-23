import mockProfileImage from '@/shared/assets/mock/mockProfileImage.png'

import type { UserInfo } from '../types'
import type {
  LoginResponse,
  LoginErrorDetail,
} from '@/features/auth/model/types'

export const mockAccessToken =
  'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTlkYTA2NS03Y2Y3LTdmNzUtYTcxMi1kNWJhZTkwNzM4ZjAiLCJpYXQiOjE3NzQwMzExMjgsImV4cCI6OTk5OTk5OTk5OX0.mock-signature'

export const mockUser: UserInfo = {
  userDetails: {
    id: '019da065-7cf7-7f75-a712-d5bae90738f0',
    profileImage: mockProfileImage.src,
    userRoles: [],
    plan: 'FREE',
    isOnboardingCompleted: true,
  },
  userChannelDetails: {
    youtubeChannelId: 'mock-channel-id',
    youtubeChannelName: 'mock-channel',
    youtubeChannelProfileImageUrl: null,
  },
}

export const mockRefreshToken = 'mock-refresh-token'
export const mockNewRefreshToken = 'mock-new-refresh-token'

const mockResponseDto = {
  accessToken: mockAccessToken,
  userDetails: {
    id: '019da065-7cf7-7f75-a712-d5bae90738f0',
    profileImage: mockProfileImage.src,
    userRoles: [],
    plan: 'FREE',
    isOnboardingCompleted: false,
  },
  userChannelDetails: {
    youtubeChannelId: 'mock-channel-id',
    youtubeChannelName: 'mock-channel',
    youtubeChannelProfileImageUrl: null,
  },
}

export const mockLoginResponse: LoginResponse = {
  success: true,
  responseDto: mockResponseDto,
  error: null,
}

export const mockReissueResponse: LoginResponse = {
  success: true,
  responseDto: mockResponseDto,
  error: null,
}

export const mockLoginError: LoginErrorDetail = {
  code: 'AUTH_401',
  message: 'Bad Request: Unsupported OAuth Provider',
}

export const mockLoginErrorResponse: LoginResponse = {
  success: false,
  responseDto: 'string',
  error: mockLoginError,
}
