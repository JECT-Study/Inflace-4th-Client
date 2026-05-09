import { axiosInstance } from '@/shared/api'
import type { ApiResponse, PageInfo } from '@/shared/api/types'
import type { Influencer } from '@/entities/influencer'

export interface BookmarkResponse {
  responseDto: string
  error: {
    code: string
    message: string
  } | null
  success: boolean
}

export interface InfluencerListResponse {
  content: Influencer[]
  pageInfo: PageInfo
  sort: {
    sorted: boolean
    sortCriteria: string
    sortOrder: 'ASC' | 'DESC'
  }
}

export interface FetchInfluencersParams {
  cursor?: string | null
  size?: number
}

export async function fetchInfluencers(
  params?: FetchInfluencersParams
): Promise<InfluencerListResponse> {
  const response = await axiosInstance.get<ApiResponse<InfluencerListResponse>>(
    '/influencers',
    { params }
  )
  return response.data.responseDto
}

/* 인플루언서 북마크 추가 / 삭제 */
export async function addBookmark(
  channelId: number
): Promise<BookmarkResponse> {
  const response = await axiosInstance.post<BookmarkResponse>(
    `/influencers/${channelId}/bookmark`
  )
  return response.data
}

export async function removeBookmark(
  channelId: number
): Promise<BookmarkResponse> {
  const response = await axiosInstance.delete<BookmarkResponse>(
    `/influencers/${channelId}/bookmark`
  )
  return response.data
}
