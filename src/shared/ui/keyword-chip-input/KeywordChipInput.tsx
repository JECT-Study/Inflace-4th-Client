'use client'

import { useState, useRef, type KeyboardEvent } from 'react'
import { toast } from 'sonner'
import { cn } from '@/shared/lib/utils'
import IconX from '@/shared/assets/round-x.svg'

interface KeywordChipInputProps {
  chips: string[]
  onChange: (chips: string[]) => void
  placeholder?: string
  maxChips?: number
  className?: string
}

export function KeywordChipInput({
  chips,
  onChange,
  placeholder = '키워드를 입력해주세요.',
  maxChips = 5,
  className,
}: KeywordChipInputProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function addChip() {
    const trimmed = input.trim()
    if (!trimmed) return
    if (chips.includes(trimmed)) {
      toast.error('이미 추가된 키워드입니다.')
      return
    }
    if (chips.length >= maxChips) {
      toast.error(`키워드는 최대 ${maxChips}개까지 추가할 수 있습니다.`)
      return
    }
    onChange([...chips, trimmed])
    setInput('')
    inputRef.current?.focus()
  }

  function removeChip(target: string) {
    onChange(chips.filter((c) => c !== target))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addChip()
    }
  }

  return (
    <div className={cn('flex flex-col gap-10', className)}>
      <div className='flex items-center gap-8'>
        <div className='flex flex-1 items-center gap-8 rounded-8 border border-stroke-border-gray-default bg-white px-16 py-10 has-[input:focus]:border-brand-primary'>
          <input
            ref={inputRef}
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className='flex-1 text-noto-body-xs-normal text-text-and-icon-primary outline-none placeholder:text-text-and-icon-tertiary'
          />
        </div>
        <button
          type='button'
          onClick={addChip}
          className='shrink-0 rounded-8 bg-background-gray-stronger px-16 py-10 text-noto-label-sm-normal text-text-and-icon-primary transition-colors hover:bg-background-gray-strong'>
          추가
        </button>
      </div>

      {chips.length > 0 && (
        <div className='flex flex-wrap gap-8'>
          {chips.map((chip) => (
            <span
              key={chip}
              className='flex items-center gap-6 rounded-full bg-background-brand-default px-12 py-6 text-noto-label-sm-normal text-brand-primary'>
              {chip}
              <button
                type='button'
                onClick={() => removeChip(chip)}
                aria-label={`${chip} 제거`}
                className='flex items-center'>
                <IconX className='size-14 text-brand-primary' />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
