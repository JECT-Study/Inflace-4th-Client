import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { VideoCardItem } from '@/entities/videos'

export interface PageInfo {
  size: number
  nextCursor: string | null
  hasNext: boolean
}

export interface VideosResponse {
  videos: VideoCardItem[]
  pageInfo: PageInfo
}

export async function fetchVideoAnalysis(
  channelId: string
): Promise<VideosResponse> {
  const response = await axiosInstance.get<ApiResponse<VideosResponse>>(
    `/channel/${channelId}/videos`
  )
  return response.data.responseDto
}
