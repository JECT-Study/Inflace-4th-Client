import { SidebarMenuItem, SidebarMenuButton } from '@/shared/ui/sidebar'
import { SidebarIcon } from '@/shared/ui/sidebarIcon'
import type { NavItem } from '../config'
import { NavLockedItem } from './NavLockedItem'
import Link from 'next/link'

interface NavMenuItemProps {
  item: NavItem
  locked?: boolean
}

export const NavMenuItem = ({ item, locked = false }: NavMenuItemProps) => {
  if (locked) return <NavLockedItem item={item} />

  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
        <Link
          href={item.url}
          className='flex items-center justify-between gap-8'>
          {item.icon && (
            <SidebarIcon
              name={item.icon}
              className='[&>path]:fill-current'
              size={20}
            />
          )}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
