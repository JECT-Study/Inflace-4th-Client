import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/shared/ui/sidebar'
import { NAV_ITEMS, UserPlan } from '../config'
import { NavMenuItem } from './NavMenuItem'
import { checkAccess } from '../lib/checkAccess'

export function NavGroupList({ userPlan }: { userPlan: UserPlan }) {
  return (
    <>
      {NAV_ITEMS.map((group) => {
        return (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <NavMenuItem
                  key={item.title}
                  item={item}
                  locked={!checkAccess(item.requiredPlan, userPlan)}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )
      })}
    </>
  )
}
