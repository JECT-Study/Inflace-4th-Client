import { http, HttpResponse } from 'msw'

const mockBrandCollaborationsResponse = {
  success: true,
  responseDto: {
    content: [
      {
        videoId: 'd4veXkvF8fg',
        videoTitle:
          '수출 40% 폭증, 미국이 쓸어 담았다… 돈 몰리는 ‘이 주식’ / 낙폭과대주들 언제 터질까?  ㅣ 이권희 대표',
        videoThumbnailUrl: 'https://i.ytimg.com/vi/d4veXkvF8fg/hqdefault.jpg',
        publishedAt: '2026-04-24T23:30:15Z',
        viewCount: 122806,
        likeCount: 3162,
        commentCount: 70,
        channelId: 'UCCG6BEYjfQMGzypJw2EJCDQ',
        channelName: '815머니톡',
        channelThumbnailUrl:
          'https://yt3.ggpht.com/ytc/AIdro_nE7wjv1m8pTETHjXPVDQ2FrUsU6GtTnBSo3qRb8qaTQcc=s88-c-k-c0x00ffffff-no-rj',
      },
      {
        videoId: 'CuXtvqTkjgk',
        videoTitle:
          '어딘가 모르게 나이 들어 보인다면? 남자의 무너진 탄력 되살리는 법 #화염파이터 #30대남자화장품 #40대남자화장품',
        videoThumbnailUrl: 'https://i.ytimg.com/vi/CuXtvqTkjgk/hqdefault.jpg',
        publishedAt: '2026-04-20T15:36:40Z',
        viewCount: 338,
        likeCount: 4,
        commentCount: 3,
        channelId: 'UCAIDepxXCz6cKfxzTYlxaUg',
        channelName: '알짜1분',
        channelThumbnailUrl:
          'https://yt3.ggpht.com/kf_W-VBTUZ0K2KgXpghjiKSurUZlZ8Uw8j3wyXHcA7gX9EC-jmKAXMPP20EXjjySLmeHoY3-JQ=s88-c-k-c0x00ffffff-no-rj',
      },
    ],
    pageInfo: {
      size: 9,
      numberOfElements: 2,
      nextCursor: 'TEFURVNUfERFU0N8Q0FrUUFB',
      hasNext: true,
    },
    sort: {
      sorted: true,
      sortCriteria: 'LATEST',
      sortOrder: 'DESC',
    },
  },
  error: null,
}

export const brandCollaborationsHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/brand-collaborations`,
    async () => {
      return HttpResponse.json(mockBrandCollaborationsResponse)
    }
  ),
]
