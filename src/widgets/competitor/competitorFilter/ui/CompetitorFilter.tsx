'use client'

import { useState, useRef, useEffect } from 'react'
import { type DateRange } from 'react-day-picker'
import { subMonths } from 'date-fns'
import { cn } from '@/shared/lib/utils'
import { formatDate } from '@/shared/lib/format'
import { Calendar } from '@/shared/ui/calendar'
import { KeywordChipInput } from '@/shared/ui/keyword-chip-input'
import IconHamburger from '@/shared/assets/hamburger-bold.svg'
import type { CompetitorFilterState } from '@/features/competitor'
import { DEFAULT_FILTER_STATE } from '@/features/competitor'
import { CompetitorDetailFilter } from './CompetitorDetailFilter'

interface CompetitorFilterProps {
  onAnalyze: (filter: CompetitorFilterState) => void
}

function formatDateRange(from?: Date, to?: Date): string {
  if (!from) return '기간 선택'
  const f = formatDate(from.toISOString())
  const fromStr = `${f.year}.${f.month}.${f.day}`
  if (!to) return fromStr
  const t = formatDate(to.toISOString())
  return `${fromStr} ~ ${t.year}.${t.month}.${t.day}`
}

export function CompetitorFilter({ onAnalyze }: CompetitorFilterProps) {
  const [filter, setFilter] = useState<CompetitorFilterState>(DEFAULT_FILTER_STATE)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  /* 달력 외부 클릭 시 닫기 */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsCalendarOpen(false)
      }
    }
    if (isCalendarOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isCalendarOpen])

  function handleDateSelect(range: DateRange | undefined) {
    setFilter((prev) => ({
      ...prev,
      dateFrom: range?.from,
      dateTo: range?.to,
    }))
  }

  function handleFilterChange<K extends keyof CompetitorFilterState>(
    key: K,
    value: CompetitorFilterState[K]
  ) {
    setFilter((prev) => ({ ...prev, [key]: value }))
  }

  function handleDetailReset() {
    setFilter((prev) => ({
      ...prev,
      contentType: DEFAULT_FILTER_STATE.contentType,
      excludeKeywords: DEFAULT_FILTER_STATE.excludeKeywords,
      category: DEFAULT_FILTER_STATE.category,
      region: DEFAULT_FILTER_STATE.region,
      language: DEFAULT_FILTER_STATE.language,
      sortBy: DEFAULT_FILTER_STATE.sortBy,
      minViews: DEFAULT_FILTER_STATE.minViews,
      minLikes: DEFAULT_FILTER_STATE.minLikes,
      minComments: DEFAULT_FILTER_STATE.minComments,
    }))
  }

  function handleAnalyze() {
    if (!filter.dateFrom || !filter.dateTo) return
    if (filter.includeKeywords.length === 0) return
    onAnalyze(filter)
  }

  const canAnalyze = !!filter.dateFrom && !!filter.dateTo && filter.includeKeywords.length > 0

  return (
    <div className='flex flex-col gap-0 rounded-16 bg-white shadow-[0_2px_6px_0_rgba(13,13,13,0.04)]'>
      <div className='flex flex-col gap-16 p-24'>
        {/* 업로드 기간 */}
        <div className='flex items-center gap-12'>
          <span className='shrink-0 text-noto-label-sm-normal text-text-and-icon-secondary'>
            업로드 기간
          </span>
          <div ref={calendarRef} className='relative'>
            <button
              type='button'
              onClick={() => setIsCalendarOpen((prev) => !prev)}
              className={cn(
                'flex items-center gap-8 rounded-8 border px-16 py-10 text-noto-label-sm-normal transition-colors',
                filter.dateFrom && filter.dateTo
                  ? 'border-brand-primary bg-brand-secondary text-white'
                  : 'border-stroke-border-gray-default bg-white text-text-and-icon-secondary'
              )}>
              {formatDateRange(filter.dateFrom, filter.dateTo)}
            </button>
            {isCalendarOpen && (
              <div className='absolute left-0 top-full z-50 mt-8'>
                <Calendar
                  mode='range'
                  defaultMonth={subMonths(filter.dateFrom ?? new Date(), 1)}
                  selected={
                    filter.dateFrom
                      ? { from: filter.dateFrom, to: filter.dateTo }
                      : undefined
                  }
                  onSelect={handleDateSelect}
                  numberOfMonths={2}
                  disabled={(date) => date > new Date()}
                  onConfirm={() => setIsCalendarOpen(false)}
                  confirmDisabled={!filter.dateFrom}
                />
              </div>
            )}
          </div>
        </div>

        {/* 포함 키워드 + 필터 아이콘 + 분석 시작 */}
        <div className='flex items-start gap-12'>
          <span className='shrink-0 pt-10 text-noto-label-sm-normal text-text-and-icon-secondary'>
            포함 키워드
          </span>
          <KeywordChipInput
            chips={filter.includeKeywords}
            onChange={(chips) => handleFilterChange('includeKeywords', chips)}
            placeholder='검색할 키워드를 입력해주세요.'
            maxChips={5}
            className='flex-1'
          />
          <div className='flex shrink-0 items-center gap-8 pt-2'>
            {/* 상세 필터 토글 버튼 */}
            <button
              type='button'
              onClick={() => setIsDetailOpen((prev) => !prev)}
              aria-label='상세 필터'
              className={cn(
                'flex items-center justify-center rounded-8 border p-10 transition-colors',
                isDetailOpen
                  ? 'border-brand-primary bg-brand-secondary text-white'
                  : 'border-stroke-border-gray-default bg-white text-text-and-icon-secondary hover:border-brand-primary'
              )}>
              <IconHamburger className='size-20' />
            </button>
            {/* 분석 시작 버튼 */}
            <button
              type='button'
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              className={cn(
                'rounded-8 px-20 py-10 text-noto-label-sm-normal transition-colors',
                canAnalyze
                  ? 'bg-brand-primary text-white hover:opacity-90'
                  : 'cursor-not-allowed bg-background-gray-stronger text-text-and-icon-tertiary'
              )}>
              분석 시작
            </button>
          </div>
        </div>
      </div>

      {/* 상세 필터 */}
      {isDetailOpen && (
        <div className='px-24 pb-24'>
          <CompetitorDetailFilter
            filter={filter}
            onChange={handleFilterChange}
            onReset={handleDetailReset}
          />
        </div>
      )}
    </div>
  )
}
