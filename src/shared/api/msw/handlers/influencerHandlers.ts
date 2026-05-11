import { http, HttpResponse } from 'msw'

import { mockInfluencers } from '@/features/influencer/mock/mockInfluencers'

export const influencerHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/influencers`, () => {
    return HttpResponse.json({
      success: true,
      responseDto: {
        content: mockInfluencers,
        pageInfo: {
          size: 12,
          numberOfElements: 12,
          nextCursor: null,
          hasNext: false,
        },
        sort: {
          sorted: true,
          sortCriteria: 'engagement_rate',
          sortOrder: 'DESC',
        },
      },
      error: null,
    })
  }),

  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/influencers/:channelId/bookmark`,
    ({ params }) => {
      const { channelId } = params
      const influencer = mockInfluencers.find((i) => String(i.channelId) === channelId)
      if (!influencer) {
        return HttpResponse.json(
          { responseDto: '', error: { code: 'NOT_FOUND', message: '인플루언서를 찾을 수 없습니다.' }, success: false },
          { status: 404 }
        )
      }
      influencer.bookmarked = true
      return HttpResponse.json({ responseDto: '북마크가 추가되었습니다.', error: null, success: true })
    }
  ),

  http.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/influencers/:channelId/bookmark`,
    ({ params }) => {
      const { channelId } = params
      const influencer = mockInfluencers.find((i) => String(i.channelId) === channelId)
      if (!influencer) {
        return HttpResponse.json(
          { responseDto: '', error: { code: 'NOT_FOUND', message: '인플루언서를 찾을 수 없습니다.' }, success: false },
          { status: 404 }
        )
      }
      influencer.bookmarked = false
      return HttpResponse.json({ responseDto: '북마크가 해제되었습니다.', error: null, success: true })
    }
  ),
]
