'use client'

import { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import { SearchBar } from '@/shared/ui/search-bar'
import { Button } from '@/shared/ui/button'
import IconHeart from '@/shared/assets/heart-bold.svg?react'
import IconLeftArrow from '@/shared/assets/leftwards-arrow-bold.svg?react'
import {
  DropdownTrigger,
  CategoryNamesDropdown,
  SubscriberDropdown,
  UploadPeriodDropdown,
  OutlierRangeDropdown,
  HasAdHistoryDropdown,
  EngagementRateDropdown,
} from '@/features/influencer'

type FilterState = {
  output: string
  outputQuery: string
}

const FILTER_DEFAULTS = {
  category: { output: '전체', outputQuery: '' },
  subscriber: { output: '전체', outputQuery: '' },
  uploadPeriod: { output: '전체', outputQuery: '' },
  hasAdHistory: { output: '있음', outputQuery: 'true' },
  engagementRate: { output: '전체', outputQuery: '' },
  outlierRange: { output: '전체', outputQuery: '' },
  language: { output: '한국어', outputQuery: 'ko' },
} satisfies Record<string, FilterState>

export function InfluencerFilter() {
  return (
    <Suspense fallback={<div className='h-full' />}>
      <InfluencerFilterInner />
    </Suspense>
  )
}

function InfluencerFilterInner() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [category, setCategory] = useState<FilterState>(
    FILTER_DEFAULTS.category
  )
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

  //화면 새로고침 시 필터 초기화
  useEffect(() => {
    router.replace(pathname ?? '/')
  }, [router, pathname])

  // 채널명 검색어 상태 및 포커스 여부
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  // useCallback 내부에서 최신 searchParams를 참조하기 위한 ref
  const searchParamsRef = useRef(searchParams)
  useEffect(() => {
    searchParamsRef.current = searchParams
  }, [searchParams])

  // URL 파라미터 반영 함수들
  const applyChannelNameToUrl = useCallback(
    (channelName: string) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString())
      if (channelName) {
        params.set('channelName', channelName)
      } else {
        params.delete('channelName')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  // categoryNames: 쉼표로 구분된 카테고리 값 목록
  const applyCategoriesToUrl = useCallback(
    (outputQuery: string) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString())
      if (outputQuery) {
        params.set('categoryNames', outputQuery)
      } else {
        params.delete('categoryNames')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  // subscriberFrom, subscriberTo: "from,to" 포맷을 분리해 각각 반영
  const applySubscriberToUrl = useCallback(
    (outputQuery: string) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString())
      const [from, to] = outputQuery.split(',')
      if (from) {
        params.set('subscriberFrom', from)
      } else {
        params.delete('subscriberFrom')
      }
      if (to) {
        params.set('subscriberTo', to)
      } else {
        params.delete('subscriberTo')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  // uploadPeriod: 쉼표로 구분된 주기 값 목록
  const applyUploadPeriodToUrl = useCallback(
    (outputQuery: string) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString())
      if (outputQuery) {
        params.set('uploadPeriod', outputQuery)
      } else {
        params.delete('uploadPeriod')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  // hasAdHistory: "true" | "false" 불리언 문자열
  const applyHasAdHistoryToUrl = useCallback(
    (outputQuery: string) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString())
      if (outputQuery) {
        params.set('hasAdHistory', outputQuery)
      } else {
        params.delete('hasAdHistory')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  // outlierRange: 선택된 배수 단일 값 (예: "1.5X")
  const applyOutlierRangeToUrl = useCallback(
    (outputQuery: string) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString())
      if (outputQuery) {
        params.set('outlierRange', outputQuery)
      } else {
        params.delete('outlierRange')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  // engagementRateFrom, engagementRateTo: "from,to" 포맷을 분리해 각각 반영
  const applyEngagementRateToUrl = useCallback(
    (outputQuery: string) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString())
      const [from, to] = outputQuery ? outputQuery.split(',') : ['', '']
      if (from) {
        params.set('engagementRateFrom', from)
      } else {
        params.delete('engagementRateFrom')
      }
      if (to) {
        params.set('engagementRateTo', to)
      } else {
        params.delete('engagementRateTo')
      }
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  // 채널명 입력 시 500ms 디바운스 후 URL 반영
  useEffect(() => {
    if (!isFocused) return
    const timer = setTimeout(() => {
      applyChannelNameToUrl(query)
    }, 500)
    return () => clearTimeout(timer)
  }, [query, isFocused, applyChannelNameToUrl])

  const isBookmarkPage = pathname === '/influencer/bookmarked'

  return (
    <div className='flex h-fit w-full flex-col items-center gap-16 bg-background-gray-default p-24'>
      {/** 보관함 페이지 헤더
       * /influencer/bookmarked일 때만 랜더링
       */}
      {isBookmarkPage && (
        <div className='flex h-[6.8rem] w-full gap-16 pt-24 pr-24 pb-16 pl-24'>
          <button
            type='button'
            onClick={() => router.push('/influencer')}
            className='flex size-24 shrink-0 items-center gap-10'>
            <IconLeftArrow className='size-full' />
          </button>
          <span className='size-fit w-full text-ibm-title-lg-normal text-text-and-icon-default'>
            보관함
          </span>
        </div>
      )}

      <div className='flex w-full items-center gap-24'>
        {/* 검색바 */}
        <SearchBar
          placeholder='채널명 또는 키워드 검색'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => {
            setQuery('')
            applyChannelNameToUrl('')
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              applyChannelNameToUrl(query)
              e.currentTarget.blur()
            }
          }}
        />

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
                  applyCategoriesToUrl(outputQuery)
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
              const [from, to] = subscriber.outputQuery
                ? subscriber.outputQuery.split(',')
                : ['', '']
              return (
                <SubscriberDropdown
                  defaultFrom={from ?? ''}
                  defaultTo={to ?? ''}
                  onChange={(output, outputQuery) => {
                    setSubscriber({ output, outputQuery })
                    applySubscriberToUrl(outputQuery)
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
                  applyUploadPeriodToUrl(outputQuery)
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
                  applyHasAdHistoryToUrl(outputQuery)
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
              const [from, to] = engagementRate.outputQuery
                ? engagementRate.outputQuery.split(',')
                : ['', '']

              return (
                <EngagementRateDropdown
                  defaultFrom={from ?? ''}
                  defaultTo={to ?? ''}
                  onChange={(output, outputQuery) => {
                    setEngagementRate({ output, outputQuery })
                    applyEngagementRateToUrl(outputQuery)
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
                  applyOutlierRangeToUrl(outputQuery)
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

        {/* 보관함 버튼: /influencer 페이지에서만 노출 */}
        {!isBookmarkPage && (
          <Button
            color='primary'
            variant='outlined'
            size='sm'
            rightIcon={<IconHeart />}
            onClick={() => router.push('/influencer/bookmarked')}>
            보관함
          </Button>
        )}
      </div>
    </div>
  )
}
