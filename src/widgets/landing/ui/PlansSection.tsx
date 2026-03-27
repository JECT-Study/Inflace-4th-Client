import { PLANS_CARD_ITEM } from '@/entities/plansCard/config/plansCardItem'
import { PlansCard } from '@/entities/plansCard/PlansCard'

export function PlansSection() {
  return (
    <>
      <div className='text-center'>
        <h3 className='text-[length:var(--text-heading-sm)] leading-[var(--leading-heading-sm)] font-semibold text-[var(--color-text-and-icon-default)]'>
          지금 무료로 시작하세요
        </h3>
        <p className='text-[length:var(--text-body-sm)] leading-[var(--leading-body-xs)] font-normal text-[var(--color-text-and-icon-tertiary)]'>
          플랜은 언제든지 변경 가능합니다
        </p>
      </div>

      <div className='mt-[var(--spacing-xl)] grid grid-cols-3 gap-[var(--spacing-md)] sm:grid-cols-1 md:grid-cols-3'>
        {PLANS_CARD_ITEM.map((item) => (
          <PlansCard
            key={item.planName}
            planName={item.planName}
            price={item.price}
            period={item.period}
            features={item.features}
            buttonLabel={item.buttonLabel}
          />
        ))}
      </div>
    </>
  )
}
