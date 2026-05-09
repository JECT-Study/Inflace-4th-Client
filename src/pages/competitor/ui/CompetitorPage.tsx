'use client'

import { useState } from 'react'
import { CompetitorFilter } from '@/widgets/competitor'
import type { CompetitorFilterState } from '@/features/competitor'

export function CompetitorPage() {
  const [, setFilter] = useState<CompetitorFilterState | null>(null)

  function handleAnalyze(filter: CompetitorFilterState) {
    setFilter(filter)
    // TODO: T-2, T-3에서 영상 리스트 / AI 인사이트 연동
  }

  return (
    <div className='flex h-fit w-full flex-col gap-24 bg-background-gray-default p-24 pb-96'>
      <CompetitorFilter onAnalyze={handleAnalyze} />
    </div>
  )
}
