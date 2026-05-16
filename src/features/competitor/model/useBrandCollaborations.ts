'use client'

import { useQuery, keepPreviousData } from '@tanstack/react-query'

import { fetchBrandCollaborations } from '../api/competitorApi'
import type {
  BrandCollaborationsQuery,
  CompetitorFilterState,
} from './types'

const DEFAULT_PAGE_SIZE = 9

export function toBrandCollaborationsQuery(
  filter: CompetitorFilterState,
  cursor?: string,
  pageSize: number = DEFAULT_PAGE_SIZE
): BrandCollaborationsQuery {
  return {
    startDate: filter.startDate?.toISOString(),
    endDate: filter.endDate?.toISOString(),
    includeKeywords:
      filter.includeKeywords.length > 0 ? filter.includeKeywords : undefined,
    excludeKeywords:
      filter.excludeKeywords.length > 0 ? filter.excludeKeywords : undefined,
    videoFormat: filter.videoFormat,
    categoryId: filter.categoryId || undefined,
    regionCode: filter.regionCode || undefined,
    languageCode: filter.languageCode || undefined,
    minViews: filter.minViews ? Number(filter.minViews) : undefined,
    minLikes: filter.minLikes ? Number(filter.minLikes) : undefined,
    minComments: filter.minComments ? Number(filter.minComments) : undefined,
    sortCriteria: filter.sortCriteria,
    sortOrder: filter.sortOrder,
    cursor,
    pageSize,
  }
}

interface UseBrandCollaborationsOptions {
  filter: CompetitorFilterState | null
  enabled?: boolean
}

export function useBrandCollaborations({
  filter,
  enabled = true,
}: UseBrandCollaborationsOptions) {
  const query = filter ? toBrandCollaborationsQuery(filter) : null

  return useQuery({
    queryKey: ['brand-collaborations', query],
    queryFn: () => fetchBrandCollaborations(query!),
    enabled: enabled && query !== null,
    placeholderData: keepPreviousData,
  })
}
