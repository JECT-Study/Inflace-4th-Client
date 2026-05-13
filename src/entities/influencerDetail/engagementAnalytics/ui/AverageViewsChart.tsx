'use client'

import { FormatAnalysis } from '@/entities/influencerDetail'
import { format10Thousands } from '@/shared/lib/format'
import { BarChartItem, BaseBarChart } from '@/shared/ui/chart/barChart'

export function AverageViewsChart({ data }: { data: FormatAnalysis }) {
  const averageViewsData: BarChartItem[] = [
    {
      label: '롱폼',
      percentage: data.longForm.averageViews30d,
      fill: '#5A44F2',
    },
    {
      label: '숏폼',
      percentage: data.shortForm.averageViews30d,
      fill: '#E4DFFF',
    },
  ]

  return (
    <div className='flex flex-col gap-24'>
      <div className='flex items-center justify-between'>
        <span className='text-noto-label-lg-bold text-text-and-icon-primary'>
          평균 조회수
        </span>
        <span className='text-noto-label-xs-normal text-text-and-icon-tertiary'>
          최근 30일
        </span>
      </div>
      <div className='flex gap-4'>
        {/* 항목 라벨 */}
        <div className='flex w-[10rem] shrink-0 flex-col gap-16'>
          {averageViewsData.map((item) => (
            <div
              className='flex h-20 w-full items-center gap-10 text-text-and-icon-primary'
              key={item.label}>
              <span className='text-noto-body-xs-bold'>{item.label}</span>
            </div>
          ))}
        </div>
        {/* 가로 막대 차트 */}
        <BaseBarChart
          itemHeight={36}
          barSize={20}
          marginTop={-8}
          marginBottom={-8}
          data={averageViewsData}
        />
        {/* 항목별 조회수 */}
        <div className='flex w-[8rem] shrink-0 flex-col gap-16 text-right'>
          {averageViewsData.map((item) => (
            <div
              className='flex h-20 items-center justify-end text-noto-body-xs-normal text-text-and-icon-default'
              key={item.label}>
              {format10Thousands(item.percentage)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
