export interface VideoDetailDto {
  thumbnailUrl: string
  videoUrl: string
  title: string
  publishedAt: string // LocalDateTime ISO string (e.g. "2024-08-08T12:00:00")
  description: string | null
  hashtags: string[] | null
  // TODO: duration 필드 없음 — 썸네일 재생시간 chip 표시를 위해 백엔드 추가 필요
}
