'use client'

import { Button } from '@/shared/ui/button'
import IconArrowRight from '@/shared/assets/rightwards-arrow-bold.svg'

interface CompetitorSelectionBarProps {
  count: number
  max: number
  onReset: () => void
  onAnalyze: () => void
}

/**
 * 결과 영역 상단에 sticky로 고정되는 선택 영상 액션 바
 * - 1개 이상 선택 시 영상 분석하기 버튼 활성화
 */
export function CompetitorSelectionBar({
  count,
  max,
  onReset,
  onAnalyze,
}: CompetitorSelectionBarProps) {
  const canAnalyze = count > 0

  return (
    <div className='sticky top-16 z-30 mx-auto flex w-fit items-center gap-40 rounded-full bg-white/90 px-24 py-12 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.1),0px_2px_8px_0px_rgba(0,0,0,0.08)] backdrop-blur-sm'>
      <p className='flex items-center gap-8 text-noto-label-lg-normal text-text-and-icon-primary'>
        선택한 영상
        <span>
          <span className='text-noto-label-lg-bold text-brand-primary'>
            {count}
          </span>
          <span className='text-text-and-icon-primary'>/{max}</span>
        </span>
      </p>

      <div className='flex items-center gap-8'>
        <Button
          type='button'
          color='primary'
          variant='outlined'
          size='lg'
          onClick={onReset}
          disabled={count === 0}
          className='rounded-full'>
          초기화
        </Button>
        <Button
          type='button'
          color='primary'
          variant='filled'
          size='lg'
          onClick={onAnalyze}
          disabled={!canAnalyze}
          rightIcon={<IconArrowRight />}
          className='rounded-full'>
          영상 분석하기
        </Button>
      </div>
    </div>
  )
}
