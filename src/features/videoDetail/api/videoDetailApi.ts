import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { VideoDetailDto } from '@/entities/video'

export async function fetchVideoDetail(videoId: string): Promise<VideoDetailDto> {
  const response = await axiosInstance.get<ApiResponse<VideoDetailDto>>(
    `/api/v1/videos/${videoId}`
  )
  return response.data.responseDto
}
