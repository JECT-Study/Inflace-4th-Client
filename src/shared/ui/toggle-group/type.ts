import type React from 'react'
import type { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'

type ToggleGroupProps = React.ComponentProps<
  typeof ToggleGroupPrimitive.Root
> & {
  type?: 'single' | 'multiple'
  spacing?: number
  orientation?: 'horizontal' | 'vertical'
  size?: 'lg' | 'fit'
}

type ToggleGroupItemProps = React.ComponentProps<
  typeof ToggleGroupPrimitive.Item
> & {
  size?: 'lg' | 'fit'
  iconPosition?: 'left' | 'top'
  imgSrc?: string
  imgAlt?: string
}

export type { ToggleGroupProps, ToggleGroupItemProps }
