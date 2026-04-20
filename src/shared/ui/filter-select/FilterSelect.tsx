'use client'

import { Select } from 'radix-ui'
import { cn } from '@/shared/lib/utils'
import IconDown from '@/shared/assets/down-bold.svg?react'

/* 최상위 컨테이너 */
function FilterSelect(props: React.ComponentProps<typeof Select.Root>) {
  return <Select.Root data-slot='select' {...props} />
}

/* 필터 트리거
 * 필터값 중 현재 선택된 값을 표시합니다.
 * ex. 최신순,좋회수순, 좋아요순...
 */
function FilterSelectTrigger(
  props: React.ComponentProps<typeof Select.Trigger>
) {
  return (
    <Select.Trigger
      data-slot='select-trigger'
      className={cn(
        /* 레이아웃 */
        'group flex size-fit cursor-pointer items-center gap-10',
        /* 스타일링 */
        'rounded-[50px] border border-stroke-border-gray-default px-16 py-10',
        /* 텍스트 */
        'text-noto-label-sm-thin text-text-and-icon-secondary',
        /* 기본 상태 */
        'transition-colors outline-none select-none',
        /* 선택됨 */
        'not-data-placeholder:bg-brand-secondary not-data-placeholder:text-noto-label-sm-normal not-data-placeholder:text-white',
        /* hover
         * TODO: 오버레이 색상 토큰 반영 */
        'relative hover:after:absolute hover:after:inset-0 hover:after:rounded-[50px] hover:after:bg-[#FFFFFF14]',
        /* placeholder */
        'data-placeholder:text-muted-foreground',
        /* select-value 자식 = FilterSelectValue */
        '*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5'
      )}
      {...props}>
      <div className='flex size-fit gap-4'>
        <FilterSelectValue />
        <Select.Icon asChild>
          <IconDown className='pointer-events-none size-16 transition-transform group-data-[state=open]:rotate-180' />
        </Select.Icon>
      </div>
    </Select.Trigger>
  )
}

/* 필터를 클릭했을 때 표시되는 컨테이너 */
function FilterSelectContent({
  className,
  children,
  position = 'popper',
  align = 'end',
  ...props
}: React.ComponentProps<typeof Select.Content>) {
  return (
    <Select.Portal>
      <Select.Content
        data-slot='select-content'
        data-align-trigger={position === 'item-aligned'}
        className={cn(
          /* 레이아웃 */
          'relative z-50 overflow-x-hidden overflow-y-auto',
          /* 크기 */
          'max-h-(--radix-select-content-available-height) min-w-45',
          /* 스타일링 */
          'rounded-6 bg-popover text-popover-foreground shadow-[0_4px_12px_0_rgba(0,0,0,0.12)]',
          /* 애니메이션 */
          'origin-(--radix-select-content-transform-origin) duration-100',
          'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
          'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          'data-[align-trigger=true]:animate-none',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          /* popper 위치 보정 */
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        align={align}
        {...props}>
        <Select.Viewport
          data-position={position}
          className={cn(
            /* popper 크기 동기화 */
            'data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)'
          )}>
          {children}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  )
}

/* 드롭다운 시 표시되는 요소들
 * ex. 최신순, 조회수순, 좋아요순...
 */
function FilterSelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Select.Item>) {
  return (
    <Select.Item
      data-slot='select-item'
      className={cn(
        /* 레이아웃 */
        'relative flex h-fit w-full cursor-pointer items-center gap-10',
        /* 스타일링 */
        'rounded-6 bg-white p-16',
        /* 텍스트 */
        'text-noto-label-sm-normal text-text-and-icon-secondary',
        /* 기본 상태 */
        'outline-hidden select-none',
        /* focus */
        'focus:bg-(--comp-button-secondary-outlined-outlined-hover) focus:text-text-and-icon-default',
        /* disabled */
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        /* svg */
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        /* span 자식 */
        '*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',
        className
      )}
      {...props}>
      <span className='pointer-events-none absolute right-2 flex size-4 items-center justify-center'>
        <Select.ItemIndicator>
          <IconDown className='pointer-events-none' />
        </Select.ItemIndicator>
      </span>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  )
}

/* SelectItem 중 선택된 값 */
function FilterSelectValue(props: React.ComponentProps<typeof Select.Value>) {
  return <Select.Value data-slot='select-value' {...props} />
}

export {
  FilterSelect,
  FilterSelectContent,
  FilterSelectItem,
  FilterSelectTrigger,
  FilterSelectValue,
}
