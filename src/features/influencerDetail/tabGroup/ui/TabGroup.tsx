'use client'

import { cn } from '@/shared/lib/utils'

export type Tab = 'performance' | 'advertisement'

interface TabItem {
  id: Tab
  label: string
}
const TABS: TabItem[] = [
  { id: 'performance', label: '성과' },
  { id: 'advertisement', label: '광고' },
]

interface TabGroupProps {
  activeTab: Tab
  onTabChange: (id: Tab) => void
}

export function TabGroup({ activeTab, onTabChange }: TabGroupProps) {
  return (
    <div className='flex h-fit w-full rounded-12 bg-background-gray-stronger p-2'>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'w-[50%] rounded-12 py-16 text-noto-label-lg-bold',
            activeTab === tab.id
              ? 'border-1 border-brand-primary bg-white text-brand-primary'
              : 'text-text-and-icon-secondary'
          )}>
          {tab.label}
        </button>
      ))}
    </div>
  )
}
