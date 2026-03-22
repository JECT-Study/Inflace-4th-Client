import Link from 'next/link'
import LogoSvg from '@/shared/assets/logo.svg'
import { cn } from '@/shared/lib/utils'

interface LogoProps {
  variant?: 'header' | 'footer'
  className?: string
}

export const Logo = ({ variant = 'header', className }: LogoProps) => {
  return (
    <Link
      href={'/'}
      className={cn(
        'inline-flex items-center gap-2 outline-none focus-visible:ring-2',
        className
      )}
      aria-label='inflace 홈으로 이동'>
      <LogoSvg
        className={cn(
          'h-auto transition-opacity hover:opacity-80',
          variant === 'header' &&
            'h-[var(--header-logo-height)] w-[var(--header-logo-width)]',
          variant === 'footer' &&
            'h-[var(--footer-logo-height)] w-[var(--footer-logo-width)]'
        )}
        role='img'
      />
      <span className='sr-only'>서비스 이름</span>
    </Link>
  )
}
