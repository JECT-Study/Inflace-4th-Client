'use client'

import { Sidebar, SidebarContent } from '@/shared/ui/shadcn/sidebar'
import { NavGroupList } from '@/features/navigation/ui/NavGroupList'
import { UserStatusCard } from '@/features/userStatus'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className='mt-[var(--spacing-header-height)] overscroll-contain'>
        <UserStatusCard />
        <div className='mt-xs flex flex-col gap-xl'>
          <NavGroupList />
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
