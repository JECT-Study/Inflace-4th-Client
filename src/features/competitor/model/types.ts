export type ContentType = 'ALL' | 'LONG_FORM' | 'SHORT_FORM'

export interface CompetitorFilterState {
  dateFrom: Date | undefined
  dateTo: Date | undefined
  includeKeywords: string[]
  // 상세 필터
  contentType: ContentType
  excludeKeywords: string[]
  category: string
  region: string
  language: string
  sortBy: string
  minViews: string
  minLikes: string
  minComments: string
}

export const DEFAULT_FILTER_STATE: CompetitorFilterState = {
  dateFrom: undefined,
  dateTo: undefined,
  includeKeywords: [],
  contentType: 'ALL',
  excludeKeywords: [],
  category: '',
  region: 'KR',
  language: 'ko',
  sortBy: 'LATEST',
  minViews: '',
  minLikes: '',
  minComments: '',
}
