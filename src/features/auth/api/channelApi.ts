import type { ApiResponse } from '@/shared/api/types'
import { axiosInstance } from '@/shared/api'
import type { ChannelConnectDto } from '../model/types'

export async function connectChannel(): Promise<ChannelConnectDto> {
  const res = await axiosInstance.post<ApiResponse<ChannelConnectDto>>(
    '/channels/connect'
  )
  return res.data.responseDto
}

export async function refreshChannel(
  channelId: number
): Promise<ChannelConnectDto> {
  const res = await axiosInstance.post<ApiResponse<ChannelConnectDto>>(
    `/channels/${channelId}/refresh`
  )
  return res.data.responseDto
}
