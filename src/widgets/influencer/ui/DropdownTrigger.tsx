import { useState, useRef, useEffect } from 'react'

import { cn } from '@/shared/lib/utils'
import type { DropdownTriggerProps } from './type'

import IconUp from '@/shared/assets/up-bold.svg'

/**
 * 드랍다운 트리거
 * 해당 버튼을 클릭하면 필터링 조건을 선택할수 있는 드랍다운 컴포넌트를 랜더링합니다.
 * 드랍다운 컴포넌트로부터 결과값(필터링 조건 - output, outputQuery)을 반환 받습니다.
 * */
function DropdownTrigger({
  label,
  output,
  outputQuery,
  children,
}: DropdownTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        onClick={() => children && setIsOpen((prev) => !prev)}
        className={cn(
          'flex size-fit cursor-pointer items-center gap-12 rounded-10 bg-white p-12',
          isOpen && 'bg-brand-secondary'
        )}>
        {/* 필터링 기준 */}
        <span
          className={cn(
            'text-noto-label-sm-bold text-text-and-icon-primary',
            isOpen && 'text-white'
          )}>
          {label}:
        </span>
        {/* 결과값 */}
        <span
          className={cn(
            'text-noto-label-sm-normal text-text-and-icon-tertiary',
            isOpen && 'text-white'
          )}>
          {output}
        </span>
        {/* 화살표 */}
        <span
          className={cn(
            'flex shrink-0 items-center justify-center transition-transform [&>svg]:h-full [&>svg]:w-full [&>svg_*]:fill-current',
            isOpen && 'text-white',
            !isOpen && 'rotate-180'
          )}>
          <IconUp />
        </span>
      </button>

      {isOpen && children && (
        <div className='absolute top-full left-0 z-10 mt-8'>
          {children(() => setIsOpen(false))}
        </div>
      )}
    </div>
  )
}

export { DropdownTrigger }
