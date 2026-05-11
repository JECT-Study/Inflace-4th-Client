import { useState } from 'react'

import { SearchBar } from '@/shared/ui/search-bar'
import { Button } from '@/shared/ui/button'
import IconHeart from '@/shared/assets/heart-bold.svg?react'
import { DropdownTrigger } from './DropdownTrigger'
import { CategoryNamesDropdown } from './CategoryNamesDropdown'
import { UploadPeriodDropdown } from './UploadPeriodDropdown'

type FilterState = {
  output: string
  outputQuery: string
}

const FILTER_DEFAULTS = {
  category: { output: '전체', outputQuery: '' },
  subscriber: { output: '전체', outputQuery: '' },
  uploadPeriod: { output: '전체', outputQuery: '' },
  adHistory: { output: '있음', outputQuery: 'true' },
  engagementRate: { output: '5%', outputQuery: '5' },
  outlierMultiplier: { output: '전체', outputQuery: '' },
  language: { output: '한국어', outputQuery: 'ko' },
} satisfies Record<string, FilterState>

export function InfluencerFilter() {
  const [category, setCategory] = useState<FilterState>(
    FILTER_DEFAULTS.category
  )
  const [subscriber, setSubscriber] = useState<FilterState>(
    FILTER_DEFAULTS.subscriber
  )
  const [uploadPeriod, setUploadPeriod] = useState<FilterState>(
    FILTER_DEFAULTS.uploadPeriod
  )
  const [adHistory, setAdHistory] = useState<FilterState>(
    FILTER_DEFAULTS.adHistory
  )
  const [engagementRate, setEngagementRate] = useState<FilterState>(
    FILTER_DEFAULTS.engagementRate
  )
  const [outlierMultiplier, setOutlierMultiplier] = useState<FilterState>(
    FILTER_DEFAULTS.outlierMultiplier
  )
  const [language, setLanguage] = useState<FilterState>(
    FILTER_DEFAULTS.language
  )

  return (
    <div className='flex h-fit w-full items-center gap-24 bg-background-gray-default p-24'>
      {/* 검색바 */}
      <SearchBar placeholder='채널명 또는 키워드 검색' />

      {/* 필터 */}
      <div className='flex h-fit w-full flex-1 items-center gap-12'>
        <DropdownTrigger
          label='카테고리'
          output={category.output}
          outputQuery={category.outputQuery}>
          {(onClose) => (
            <CategoryNamesDropdown
              defaultValue={
                category.outputQuery ? category.outputQuery.split(',') : []
              }
              onChange={(output, outputQuery) => {
                setCategory({ output, outputQuery })
                onClose()
              }}
            />
          )}
        </DropdownTrigger>
        <DropdownTrigger
          label='구독자 수'
          output={subscriber.output}
          outputQuery={subscriber.outputQuery}
          onChange={(output, outputQuery) =>
            setSubscriber({ output, outputQuery })
          }
        />
        <DropdownTrigger
          label='업로드 주기'
          output={uploadPeriod.output}
          outputQuery={uploadPeriod.outputQuery}>
          {(onClose) => (
            <UploadPeriodDropdown
              defaultValue={
                uploadPeriod.outputQuery
                  ? uploadPeriod.outputQuery.split(',')
                  : []
              }
              onChange={(output, outputQuery) => {
                setUploadPeriod({ output, outputQuery })
                onClose()
              }}
            />
          )}
        </DropdownTrigger>
        <DropdownTrigger
          label='광고 이력'
          output={adHistory.output}
          outputQuery={adHistory.outputQuery}
          onChange={(output, outputQuery) =>
            setAdHistory({ output, outputQuery })
          }
        />
        <DropdownTrigger
          label='참여율'
          output={engagementRate.output}
          outputQuery={engagementRate.outputQuery}
          onChange={(output, outputQuery) =>
            setEngagementRate({ output, outputQuery })
          }
        />
        <DropdownTrigger
          label='Outlier 배수'
          output={outlierMultiplier.output}
          outputQuery={outlierMultiplier.outputQuery}
          onChange={(output, outputQuery) =>
            setOutlierMultiplier({ output, outputQuery })
          }
        />
        <DropdownTrigger
          label='언어'
          output={language.output}
          outputQuery={language.outputQuery}
          onChange={(output, outputQuery) =>
            setLanguage({ output, outputQuery })
          }
        />
      </div>

      {/* 보관함 버튼 */}
      <Button
        color='primary'
        variant='outlined'
        size='sm'
        rightIcon={<IconHeart />}>
        보관함
      </Button>
    </div>
  )
}
