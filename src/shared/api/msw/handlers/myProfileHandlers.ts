import { http, HttpResponse } from 'msw'

import { mockMyProfile } from '@/features/me/profile/mock/mockMyProfile'

export const myProfileHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, () => {
    return HttpResponse.json({
      success: true,
      responseDto: mockMyProfile,
      error: null,
    })
  }),
]
