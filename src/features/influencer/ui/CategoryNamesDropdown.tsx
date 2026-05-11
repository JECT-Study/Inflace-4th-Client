import { useState } from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

const CATEGORY_OPTIONS: { label: string; value: string }[] = [
  { label: '영화/애니메이션', value: '영화/애니메이션' },
  { label: '인물/블로그', value: '인물/블로그' },
  { label: '자동차', value: '자동차' },
  { label: '코미디', value: '코미디' },
  { label: '음악', value: '음악' },
  { label: '엔터테인먼트', value: '엔터테인먼트' },
  { label: '반려동물/동물', value: '반려동물/동물' },
  { label: '뉴스/정치', value: '뉴스/정치' },
  { label: '스포츠', value: '스포츠' },
  { label: '노하우/스타일', value: '노하우/스타일' },
  { label: '여행/이벤트', value: '여행/이벤트' },
  { label: '교육', value: '교육' },
  { label: '게임', value: '게임' },
  { label: '과학/기술', value: '과학/기술' },
]

type CategoryNamesDropdownProps = {
  defaultValue?: string[]
  onChange: (output: string, outputQuery: string) => void
}

function CategoryNamesDropdown({
  defaultValue = [],
  onChange,
}: CategoryNamesDropdownProps) {
  const [selected, setSelected] = useState<string[]>(defaultValue)

  /* 최대 3개까지만 선택 가능 */
  function toggleOption(value: string) {
    setSelected((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value)
      if (prev.length >= 3) return prev
      return [...prev, value]
    })
  }

  function handleConfirm() {
    const selectedLabels = CATEGORY_OPTIONS.filter((o) =>
      selected.includes(o.value)
    ).map((o) => o.label)

    const output =
      selectedLabels.length === 0
        ? '전체'
        : selectedLabels.length === 1
          ? selectedLabels[0]
          : `${selectedLabels[0]} 외 ${selectedLabels.length - 1}`

    onChange(output, selected.join(','))
  }

  return (
    <div className='flex h-fit w-[38rem] flex-col rounded-6 bg-white p-16 shadow-[0px_8px_12px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-16),0px_4px_6px_0px_var(--primitivecolortrasparent-brand-deep-900-transparent-24)]'>
      <ul className='grid grid-cols-2 gap-2'>
        {CATEGORY_OPTIONS.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <li key={option.value}>
              <button
                onClick={() => toggleOption(option.value)}
                className={cn(
                  'flex h-fit w-full items-center gap-10 rounded-6 p-16 text-noto-label-md-normal text-text-and-icon-secondary',
                  isSelected &&
                    'bg-btn-secondary-outlined-hover text-text-and-icon-default'
                )}>
                {option.label}
              </button>
            </li>
          )
        })}
      </ul>

      <div className='flex justify-end'>
        <Button
          color='secondary'
          variant='filled'
          size='sm'
          disabled={selected.length === 0}
          onClick={handleConfirm}>
          완료
        </Button>
      </div>
    </div>
  )
}

export { CategoryNamesDropdown }
