import { axiosInstance } from '@/shared/api'
import type { ApiResponse, PageInfo } from '@/shared/api/types'
import type { Influencer } from '@/entities/influencer'
import type { YoutubeCategory } from '../mock/mockYoutubeCategories'
import { mockInfluencers } from '../mock/mockInfluencers'

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

export interface YoutubeCategoriesResponse {
  youtubeCategories: YoutubeCategory[]
}

export interface FetchInfluencersParams {
  cursor?: string | null
  size?: number
  categoryIds?: number[]
}

const PAGE_SIZE = 9

export async function fetchInfluencers(
  params?: FetchInfluencersParams
): Promise<InfluencerListResponse> {
  const startIndex = params?.cursor ? parseInt(params.cursor, 10) : 0
  const content = mockInfluencers.slice(startIndex, startIndex + PAGE_SIZE)
  const nextIndex = startIndex + PAGE_SIZE
  const hasNext = nextIndex < mockInfluencers.length

  return {
    content,
    pageInfo: {
      size: PAGE_SIZE,
      numberOfElements: content.length,
      nextCursor: hasNext ? String(nextIndex) : null,
      hasNext,
    },
    sort: {
      sorted: false,
      sortCriteria: '',
      sortOrder: 'ASC',
    },
  }
}

/* 카테고리 드롭다운 목록 */
export async function fetchYoutubeCategories(): Promise<YoutubeCategoriesResponse> {
  const response = await axiosInstance.get<
    ApiResponse<YoutubeCategoriesResponse>
  >('/youtube-categories')
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
