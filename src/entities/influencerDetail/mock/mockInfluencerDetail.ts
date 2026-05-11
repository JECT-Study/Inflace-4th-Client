import { InfluencerDetailResponseDto } from '../model/types'
import mockChannelBanner from '@/shared/assets/mock/mockBannerImage.png'
import mockChannelProfile from '@/shared/assets/mock/mockProfileImage.png'

export const mockInfluencerDetail: InfluencerDetailResponseDto = {
  channelId: 226,
  channelName: '뷰티크리에이터 민지',
  bannerImageUrl: mockChannelBanner.src,
  profileImageUrl: mockChannelProfile.src,
  channelHandle: '@minji_beauty',
  joinedAt: '2020.03.15',
  subscriberCount: 285000,
  categories: ['반려동물/동물', '자동차'],
  audience: {
    score: 35.3,
    engagementRate: 0.83,
    likeRate: 0.82,
    commentRate: 0.01,
    viewsPerSubscriberRate: 5109.43,
  },
  content: {
    score: 51.82,
    viral2xRate: 12.0,
    viral5xRate: 8.0,
    medianVph: 476.31,
    growthTrendRate: -26.57,
  },
  activity: {
    score: 79.18,
    recentUpload: 15,
    uploadCycle: 17.02,
    frequencyTrend: 'INCREASING',
  },
  advertisement: {
    score: 27.66,
    viewCoefficientOfVariation: 2.17,
    subscriberHealthRate: 5109.43,
  },
  formatAnalysis: {
    longForm: {
      averageViews30d: 0.0,
      engagementRate: 0.0,
    },
    shortForm: {
      averageViews30d: 436465.57,
      engagementRate: 0.68,
    },
  },
}
