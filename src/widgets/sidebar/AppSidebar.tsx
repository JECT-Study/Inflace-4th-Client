'use client'

import { Sidebar, SidebarContent } from '@/shared/ui/sidebar'
import { NavGroupList } from '@/features/navigation/ui/NavGroupList'
import { UserPlan } from '@/features/navigation/config'
import { UserStatusCard } from '@/features/userStatus'
import { mockUserFree } from '@/features/userStatus/model/mock'

export function AppSidebar({ userPlan }: { userPlan: UserPlan }) {
  return (
    <Sidebar>
      <SidebarContent className='mt-[var(--spacing-header-height)]'>
        <UserStatusCard user={mockUserFree} />
        <div className='mt-xs flex flex-col gap-xl'>
          <NavGroupList userPlan={userPlan} />
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
