'use client'

import { Input } from '@/shared/ui/shadcn/input'
import { KeywordChipInput } from '@/shared/ui/keyword-chip-input'
import {
  FilterSelect,
  FilterSelectContent,
  FilterSelectItem,
  FilterSelectTrigger,
} from '@/shared/ui/filter-select'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group'
import type { CompetitorFilterState, ContentType } from '@/features/competitor'

interface CompetitorDetailFilterProps {
  filter: CompetitorFilterState
  onChange: <K extends keyof CompetitorFilterState>(
    key: K,
    value: CompetitorFilterState[K]
  ) => void
  onReset: () => void
}

const CONTENT_TYPE_OPTIONS: { value: ContentType; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'LONG_FORM', label: '롱폼' },
  { value: 'SHORT_FORM', label: '숏폼' },
]

export function CompetitorDetailFilter({
  filter,
  onChange,
  onReset,
}: CompetitorDetailFilterProps) {
  return (
    <div className='flex flex-col gap-20 border-t border-stroke-border-gray-default pt-20'>
      {/* 영상 형식 */}
      <div className='flex items-start gap-16'>
        <span className='w-[10rem] shrink-0 pt-10 text-noto-label-sm-normal text-text-and-icon-secondary'>
          영상 형식
        </span>
        <ToggleGroup
          type='single'
          size='fit'
          spacing={4}
          value={filter.contentType}
          onValueChange={(v: string) => {
            if (v) onChange('contentType', v as ContentType)
          }}>
          {CONTENT_TYPE_OPTIONS.map(({ value, label }) => (
            <ToggleGroupItem key={value} value={value}>
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* 제외 키워드 */}
      <div className='flex items-start gap-16'>
        <span className='w-[10rem] shrink-0 pt-10 text-noto-label-sm-normal text-text-and-icon-secondary'>
          제외 키워드
        </span>
        <KeywordChipInput
          chips={filter.excludeKeywords}
          onChange={(chips) => onChange('excludeKeywords', chips)}
          placeholder='제외할 키워드를 입력해주세요.'
          maxChips={5}
          className='flex-1'
        />
      </div>

      {/* 드롭다운 필터 */}
      <div className='flex flex-wrap gap-12'>
        <div className='flex items-center gap-8'>
          <span className='text-noto-label-sm-normal text-text-and-icon-secondary'>
            영상 카테고리
          </span>
          <FilterSelect
            value={filter.category || 'Beauty'}
            onValueChange={(v) => onChange('category', v)}>
            <FilterSelectTrigger />
            <FilterSelectContent>
              {['Beauty', '게임', '음식', '여행', '교육', '엔터테인먼트'].map(
                (cat) => (
                  <FilterSelectItem key={cat} value={cat}>
                    {cat}
                  </FilterSelectItem>
                )
              )}
            </FilterSelectContent>
          </FilterSelect>
        </div>

        <div className='flex items-center gap-8'>
          <span className='text-noto-label-sm-normal text-text-and-icon-secondary'>
            지역 코드
          </span>
          <FilterSelect
            value={filter.region}
            onValueChange={(v) => onChange('region', v)}>
            <FilterSelectTrigger />
            <FilterSelectContent>
              {['KR', 'US', 'JP', 'GB'].map((r) => (
                <FilterSelectItem key={r} value={r}>
                  {r}
                </FilterSelectItem>
              ))}
            </FilterSelectContent>
          </FilterSelect>
        </div>

        <div className='flex items-center gap-8'>
          <span className='text-noto-label-sm-normal text-text-and-icon-secondary'>
            언어
          </span>
          <FilterSelect
            value={filter.language}
            onValueChange={(v) => onChange('language', v)}>
            <FilterSelectTrigger />
            <FilterSelectContent>
              {[
                { value: 'ko', label: '한국어' },
                { value: 'en', label: '영어' },
                { value: 'ja', label: '일본어' },
              ].map(({ value, label }) => (
                <FilterSelectItem key={value} value={value}>
                  {label}
                </FilterSelectItem>
              ))}
            </FilterSelectContent>
          </FilterSelect>
        </div>

        <div className='flex items-center gap-8'>
          <span className='text-noto-label-sm-normal text-text-and-icon-secondary'>
            정렬 기준
          </span>
          <FilterSelect
            value={filter.sortBy}
            onValueChange={(v) => onChange('sortBy', v)}>
            <FilterSelectTrigger />
            <FilterSelectContent>
              {[
                { value: 'LATEST', label: '최신순' },
                { value: 'VIEWS', label: '조회수순' },
                { value: 'LIKES', label: '좋아요순' },
              ].map(({ value, label }) => (
                <FilterSelectItem key={value} value={value}>
                  {label}
                </FilterSelectItem>
              ))}
            </FilterSelectContent>
          </FilterSelect>
        </div>
      </div>

      {/* 수치 필터 */}
      <div className='flex flex-wrap gap-12'>
        <div className='flex items-center gap-8'>
          <span className='shrink-0 text-noto-label-sm-normal text-text-and-icon-secondary'>
            최소 조회수
          </span>
          <Input
            type='number'
            placeholder='예: 1000'
            value={filter.minViews}
            onChange={(e) => onChange('minViews', e.target.value)}
            min={0}
            className='w-[14rem]'
          />
        </div>
        <div className='flex items-center gap-8'>
          <span className='shrink-0 text-noto-label-sm-normal text-text-and-icon-secondary'>
            최소 좋아요수
          </span>
          <Input
            type='number'
            placeholder='예: 100'
            value={filter.minLikes}
            onChange={(e) => onChange('minLikes', e.target.value)}
            min={0}
            className='w-[14rem]'
          />
        </div>
        <div className='flex items-center gap-8'>
          <span className='shrink-0 text-noto-label-sm-normal text-text-and-icon-secondary'>
            최소 댓글수
          </span>
          <Input
            type='number'
            placeholder='예: 10'
            value={filter.minComments}
            onChange={(e) => onChange('minComments', e.target.value)}
            min={0}
            className='w-[14rem]'
          />
        </div>
      </div>

      {/* 초기화 버튼 */}
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={onReset}
          className='text-noto-label-sm-normal text-text-and-icon-tertiary underline-offset-2 hover:underline'>
          초기화
        </button>
      </div>
    </div>
  )
}
