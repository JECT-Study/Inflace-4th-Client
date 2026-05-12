import { useState } from 'react'

import { SearchBar } from '@/shared/ui/search-bar'
import { Button } from '@/shared/ui/button'
import IconHeart from '@/shared/assets/heart-bold.svg?react'
import {
  DropdownTrigger,
  CategoryNamesDropdown,
  SubscriberDropdown,
  UploadPeriodDropdown,
  OutlierRangeDropdown,
  HasAdHistoryDropdown,
  EngagementRateDropdown,
  type YoutubeCategory,
} from '@/features/influencer'

type FilterState = {
  output: string
  outputQuery: string
}

type CategoryFilterState = {
  output: string
  categoryIds: number[]
}

const CATEGORY_DEFAULT: CategoryFilterState = { output: '전체', categoryIds: [] }

const FILTER_DEFAULTS = {
  subscriber: { output: '전체', outputQuery: '' },
  uploadPeriod: { output: '전체', outputQuery: '' },
  hasAdHistory: { output: '있음', outputQuery: 'true' },
  engagementRate: { output: '전체', outputQuery: '' },
  outlierRange: { output: '전체', outputQuery: '' },
  language: { output: '한국어', outputQuery: 'ko' },
} satisfies Record<string, FilterState>

type InfluencerFilterProps = {
  categories: YoutubeCategory[]
}

export function InfluencerFilter({ categories }: InfluencerFilterProps) {
  const [category, setCategory] = useState<CategoryFilterState>(CATEGORY_DEFAULT)
  const [subscriber, setSubscriber] = useState<FilterState>(
    FILTER_DEFAULTS.subscriber
  )
  const [uploadPeriod, setUploadPeriod] = useState<FilterState>(
    FILTER_DEFAULTS.uploadPeriod
  )
  const [hasAdHistory, setHasAdHistory] = useState<FilterState>(
    FILTER_DEFAULTS.hasAdHistory
  )
  const [engagementRate, setEngagementRate] = useState<FilterState>(
    FILTER_DEFAULTS.engagementRate
  )
  const [outlierRange, setOutlierRange] = useState<FilterState>(
    FILTER_DEFAULTS.outlierRange
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
          outputQuery={category.categoryIds.join(',')}>
          {(onClose) => (
            <CategoryNamesDropdown
              categories={categories}
              defaultValue={category.categoryIds}
              onChange={(output, categoryIds) => {
                setCategory({ output, categoryIds })
                onClose()
              }}
            />
          )}
        </DropdownTrigger>

        <DropdownTrigger
          label='구독자 수'
          output={subscriber.output}
          outputQuery={subscriber.outputQuery}>
          {(onClose) => {
            const parsed = subscriber.outputQuery
              ? JSON.parse(subscriber.outputQuery)
              : {}
            return (
              <SubscriberDropdown
                defaultFrom={parsed.subscriberFrom ?? ''}
                defaultTo={parsed.subscriberTo ?? ''}
                onChange={(output, outputQuery) => {
                  setSubscriber({ output, outputQuery })
                  onClose()
                }}
              />
            )
          }}
        </DropdownTrigger>

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
          output={hasAdHistory.output}
          outputQuery={hasAdHistory.outputQuery}>
          {(onClose) => (
            <HasAdHistoryDropdown
              defaultValue={hasAdHistory.outputQuery}
              onChange={(output, outputQuery) => {
                setHasAdHistory({ output, outputQuery })
                onClose()
              }}
            />
          )}
        </DropdownTrigger>

        <DropdownTrigger
          label='참여율'
          output={engagementRate.output}
          outputQuery={engagementRate.outputQuery}>
          {(onClose) => {
            let defaultSelectedOptions = undefined
            let defaultFrom = ''
            let defaultTo = ''

            if (engagementRate.outputQuery) {
              try {
                const parsed = JSON.parse(engagementRate.outputQuery)
                defaultFrom = parsed.engagementRateFrom ?? ''
                defaultTo = parsed.engagementRateTo ?? ''
              } catch {
                type EngagementRateItem = {
                  engagementRateFrom: string
                  engagementRateTo: string
                }
                const items: EngagementRateItem[] | undefined =
                  engagementRate.outputQuery
                    .match(/\{[^}]+\}/g)
                    ?.map((s) => JSON.parse(s) as EngagementRateItem)
                defaultSelectedOptions = items?.map((o) => ({
                  from: o.engagementRateFrom,
                  to: o.engagementRateTo,
                }))
              }
            }

            return (
              <EngagementRateDropdown
                defaultSelectedOptions={defaultSelectedOptions}
                defaultFrom={defaultFrom}
                defaultTo={defaultTo}
                onChange={(output, outputQuery) => {
                  setEngagementRate({ output, outputQuery })
                  onClose()
                }}
              />
            )
          }}
        </DropdownTrigger>

        <DropdownTrigger
          label='Outlier 배수'
          output={outlierRange.output}
          outputQuery={outlierRange.outputQuery}>
          {(onClose) => (
            <OutlierRangeDropdown
              defaultValue={outlierRange.outputQuery}
              onChange={(output, outputQuery) => {
                setOutlierRange({ output, outputQuery })
                onClose()
              }}
            />
          )}
        </DropdownTrigger>

        {/* TODO: 기획단에서 언어와 관련된 필터값 논의중 */}
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
