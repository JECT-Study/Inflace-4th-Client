'use client'

import { useEffect } from 'react'
import { FeatureSection, HeroMain, PlansSection } from '@/widgets/landing'

export default function HomePage() {
  useEffect(() => {
    document.documentElement.classList.add('snap-landing')
    const footer = document.querySelector('footer')
    footer?.classList.add('snap-start')
    return () => {
      document.documentElement.classList.remove('snap-landing')
      footer?.classList.remove('snap-start')
    }
  }, [])

  return (
    <>
      <HeroMain />
      <div className='snap-start'>
        <section className='grid grid-cols-1 gap-(--spacing-md) px-[var(--spacing-md)] py-[var(--spacing-56)] md:grid-cols-2 lg:grid-cols-3'>
          <FeatureSection />
        </section>
        <section className='px-[var(--spacing-md)] py-[var(--spacing-56)]'>
          <PlansSection />
        </section>
      </div>
    </>
  )
}
