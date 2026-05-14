import type { VideoFormat, SortCriteria } from './types'

export interface SelectOption<T extends string = string> {
  value: T
  label: string
}

/* 영상 형태 - ToggleGroup 옵션 */
export const VIDEO_FORMAT_OPTIONS: SelectOption<VideoFormat>[] = [
  { value: 'ALL', label: '전체' },
  { value: 'LONG_FORM', label: '롱폼' },
  { value: 'SHORT_FORM', label: '숏폼' },
]

/* 유튜브 표준 카테고리 ID 매핑 */
export const CATEGORY_OPTIONS: SelectOption[] = [
  { value: '1', label: '영화/애니메이션' },
  { value: '2', label: '자동차' },
  { value: '10', label: '음악' },
  { value: '15', label: '반려동물/동물' },
  { value: '17', label: '스포츠' },
  { value: '19', label: '여행/이벤트' },
  { value: '20', label: '게임' },
  { value: '22', label: '인물/블로그' },
  { value: '23', label: '코미디' },
  { value: '24', label: '엔터테인먼트' },
  { value: '25', label: '뉴스/정치' },
  { value: '26', label: '노하우/스타일' },
  { value: '27', label: '교육' },
  { value: '28', label: '과학기술' },
]

/* ISO 3166-1 alpha-2 지역 코드 */
export const REGION_OPTIONS: SelectOption[] = [
  { value: 'KR', label: '한국' },
  { value: 'US', label: '미국' },
  { value: 'JP', label: '일본' },
  { value: 'GB', label: '영국' },
  { value: 'DE', label: '독일' },
  { value: 'FR', label: '프랑스' },
]

/* ISO 639-1 언어 코드 */
export const LANGUAGE_OPTIONS: SelectOption[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: '영어' },
  { value: 'ja', label: '일본어' },
  { value: 'zh', label: '중국어' },
  { value: 'es', label: '스페인어' },
]

/* 정렬 기준 */
export const SORT_CRITERIA_OPTIONS: SelectOption<SortCriteria>[] = [
  { value: 'LATEST', label: '최신순' },
  { value: 'VIEWS', label: '조회수순' },
  { value: 'LIKES', label: '좋아요순' },
  { value: 'COMMENTS', label: '댓글순' },
]
