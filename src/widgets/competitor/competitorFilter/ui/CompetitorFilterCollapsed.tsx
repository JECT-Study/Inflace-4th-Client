'use client'

import { cn } from '@/shared/lib/utils'
import IconChevronDown from '@/shared/assets/down-bold.svg'

interface CompetitorFilterCollapsedProps {
  onExpand: () => void
}

export function CompetitorFilterCollapsed({
  onExpand,
}: CompetitorFilterCollapsedProps) {
  return (
    <div className='flex w-full items-center justify-between bg-background-gray-default px-32 py-24'>
      <h2 className='text-noto-title-sm-normal text-text-and-icon-default'>
        경쟁 채널 영상 검색 필터
      </h2>
      <button
        type='button'
        onClick={onExpand}
        className={cn(
          'flex items-center gap-4 rounded-full px-16 py-6 text-noto-label-md-normal text-text-and-icon-secondary transition-colors hover:bg-white'
        )}>
        필터 펼치기
        <IconChevronDown className='size-16' />
      </button>
    </div>
  )
}
