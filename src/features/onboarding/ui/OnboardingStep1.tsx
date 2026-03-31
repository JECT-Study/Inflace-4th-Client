import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group'
import { OPTION_ITEM } from '../model/optionsStep01'
import { useOnboardingModal } from '../model/useOnboardingModal'

export function OnboardingStep1() {
  const setSelection = useOnboardingModal((s) => s.setSelection)

  return (
    <>
      <p className='text-[length:var(--text-title-sm)] leading-[var(--leading-title-sm)] font-medium text-[var(--color-text-and-icon-default)]'>
        어떤 일을 하시나요?
      </p>
      <p className='mt-[var(--spacing-4)] text-[length:var(--text-label-xs)] leading-[var(--leading-label-xs)] font-normal text-[var(--color-text-and-icon-tertiary)]'>
        맞춤 콘텐츠를 제공해드려요
      </p>

      <ToggleGroup
        type='single'
        size='lg'
        spacing={20}
        onValueChange={(value) => setSelection(1, value)}
        className='mt-[var(--spacing-xl)]'>
        {OPTION_ITEM.map((item) => (
          <ToggleGroupItem
            key={item.label}
            value={item.value}
            iconPosition='top'
            imgSrc={item.imgSrc.src}
            imgAlt={item.label}
            aria-label={item.label}>
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </>
  )
}
