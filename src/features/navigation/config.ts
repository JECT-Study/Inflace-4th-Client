import type { IconName } from '@/shared/ui/sidebarIcon'

export type UserPlan = 'free' | 'starter' | 'growth'

export interface NavItem {
  id?: string | number
  title: string
  icon?: IconName
  url: string
  requiredPlan?: UserPlan
}

export interface NavGroup {
  id: number
  group: string
  items: NavItem[]
}

export const NAV_ITEMS: NavGroup[] = [
  {
    id: 1,
    group: '내 채널 분석',
    items: [
      {
        title: '채널 분석',
        icon: 'dashboard',
        url: '',
      },
      {
        title: '영상 성과 분석',
        icon: 'video',
        url: '',
        requiredPlan: 'growth',
      },
    ],
  },
  {
    id: 2,
    group: '인플루언서 탐색',
    items: [
      {
        title: '인플루언서 검색',
        icon: 'search',
        url: '',
      },
      {
        title: '경쟁 채널 분석',
        icon: 'chart',
        url: '',
        requiredPlan: 'growth',
      },
    ],
  },
  {
    id: 3,
    group: '비즈니스 전략',
    items: [
      {
        title: '콘텐츠 전략',
        icon: 'strategy',
        url: '',
        requiredPlan: 'growth',
      },
      {
        title: '트렌드 매거진',
        icon: 'trend',
        url: '',
        requiredPlan: 'growth',
      },
    ],
  },
  {
    id: 4,
    group: '협업',
    items: [
      {
        title: '협업 매칭',
        icon: 'message',
        url: '',
        requiredPlan: 'growth',
      },
    ],
  },
  {
    id: 5,
    group: '지원',
    items: [{ title: '고객센터', icon: 'info', url: '' }],
  },
]
