import { axiosInstance } from '@/shared/api'
import type { PageInfo } from '@/shared/api/types'
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
  channelName?: string
  categoryNames?: string
  subscriberFrom?: string
  subscriberTo?: string
  uploadPeriod?: string
  hasAdHistory?: string
  engagementRateFrom?: string
  engagementRateTo?: string
  outlierRange?: string
  language?: string
  sortCriteria?: string
  sortOrder?: string
}

export async function fetchInfluencers(
  params?: FetchInfluencersParams
): Promise<InfluencerListResponse> {
  const { cursor, ...rest } = params ?? {}
  const query: Record<string, string> = {}
  if (cursor) query['cursor'] = cursor
  Object.entries(rest).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query[key] = String(value)
    }
  })
  const response = await axiosInstance.get<{
    success: boolean
    responseDto: InfluencerListResponse
    error: null
  }>('/influencers', { params: query })
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
