import mockProfileImage from '@/shared/assets/mock/mockProfileImage.png'
import type { UserDetails, UserChannelDetails, UserInfo } from '../types'

/* 토큰 */
export const mockAccessToken =
  'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTlkYTA2NS03Y2Y3LTdmNzUtYTcxMi1kNWJhZTkwNzM4ZjAiLCJpYXQiOjE3NzQwMzExMjgsImV4cCI6OTk5OTk5OTk5OX0.mock-signature'
export const mockRefreshToken = 'mock-refresh-token'
export const mockNewRefreshToken = 'mock-new-refresh-token'

/* 유저 기본 정보 */
export const mockUserDetails: UserDetails = {
  id: '019da065-7cf7-7f75-a712-d5bae90738f0',
  profileImage: mockProfileImage.src,
  userRoles: [],
  plan: 'FREE',
  isOnboardingCompleted: true,
}

/* 유튜브 채널 정보 */
export const mockUserChannelDetails: UserChannelDetails = {
  youtubeChannelId: 'mock-channel-id',
  youtubeChannelName: '김튜브 스튜디오 김튜브 스튜디오',
  youtubeChannelProfileImageUrl: mockProfileImage.src,
}

/* 유저 정보 (UserDetails + UserChannelDetails) */
export const mockUser: UserInfo = {
  userDetails: mockUserDetails,
  userChannelDetails: mockUserChannelDetails,
}
