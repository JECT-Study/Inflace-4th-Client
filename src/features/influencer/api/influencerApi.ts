import { axiosInstance } from '@/shared/api'
import type { ApiResponse } from '@/shared/api/types'
import type { Influencer } from '@/entities/influencer'

export interface BookmarkResponse {
  responseDto: string
  error: {
    code: string
    message: string
  } | null
  success: boolean
}

/* TODO: 페이지 랜더링 관련 필드 형식 백엔드와 논의중 */
export interface InfluencerListResponse {
  content: Influencer[]
  pageSize: number
  hasNext: boolean
  numberOfElements: number
  empty: boolean
  sort: {
    sorted: boolean
    sortCriteria: string
    sortOrder: 'ASC' | 'DESC'
  }
}

export async function fetchInfluencers(): Promise<InfluencerListResponse> {
  const response = await axiosInstance.get<ApiResponse<InfluencerListResponse>>(
    '/api/v1/influencers'
  )
  return response.data.responseDto
}

/* 인플루언서 북마크 추가 / 삭제 */
export async function addBookmark(
  channelId: number
): Promise<BookmarkResponse> {
  const response = await axiosInstance.post<BookmarkResponse>(
    `/api/v1/influencers/${channelId}/bookmark`
  )
  return response.data
}

export async function removeBookmark(
  channelId: number
): Promise<BookmarkResponse> {
  const response = await axiosInstance.delete<BookmarkResponse>(
    `/api/v1/influencers/${channelId}/bookmark`
  )
  return response.data
}
