import type { VideosResponse, VideoFilterParams } from '../model/types'
import { mockVideosPage1, mockVideosPage2 } from '../mock/mockVideos'

const MOCK_PAGES: VideosResponse[] = [mockVideosPage1, mockVideosPage2]

export async function fetchVideoList(
  _channelId: string,
  params?: VideoFilterParams
): Promise<VideosResponse> {
  const cursor = params?.cursor
  const pageIndex = cursor ? parseInt(cursor, 10) : 0
  return MOCK_PAGES[pageIndex] ?? { videos: [], pageInfo: { size: 0, numberOfElements: 0, nextCursor: null, hasNext: false } }
}
