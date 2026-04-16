import { Calendar } from 'lucide-react'

type LatestUploadDateCardVariant = 'default' | 'dashboard'

interface RecenetUploadDateCardProps {
  value: {
    year: string
    month: string
    day: string
  }
  variant?: LatestUploadDateCardVariant
}

//구독자 수, 총 동영상 수, 최근 업로드일을 알려주는 카드 컴포넌트
const cardBgVariants: Record<LatestUploadDateCardVariant, string> = {
  default: 'bg-white',
  dashboard: 'bg-background-gray-default',
}

export function LatestUploadDateCard({
  value,
  variant = 'default',
}: RecenetUploadDateCardProps) {
  return (
    <div
      className={`min-w[168px] flex h-fit w-full flex-col gap-4 rounded-12 ${cardBgVariants[variant]} px-32 py-16`}>
      {/* 아이콘 + 내용 */}
      <div className='flex h-fit w-full items-center gap-4 text-noto-body-xs-bold text-text-and-icon-tertiary'>
        <span>
          <Calendar size={16} />
        </span>
        <span>최근 업로드일</span>
      </div>

      {/* 년 월 일*/}
      <div className='flex h-fit w-full items-center gap-8'>
        {/* 년 */}
        <div className='flex items-center gap-2'>
          <span className='text-ibm-heading-sm-thin font-medium text-brand-secondary'>
            {value.year}
          </span>
          <span className='font-medium text-text-and-icon-tertiary'>년</span>
        </div>

        {/* 월 */}
        <div className='flex items-center gap-2'>
          <span className='text-ibm-heading-sm-thin font-medium text-brand-secondary'>
            {value.month}
          </span>
          <span className='font-medium text-text-and-icon-tertiary'>월</span>
        </div>

        {/* 일 */}
        <div className='flex items-center gap-2'>
          <span className='text-ibm-heading-sm-thin font-medium text-brand-secondary'>
            {value.day}
          </span>
          <span className='font-medium text-text-and-icon-tertiary'>일</span>
        </div>
      </div>
    </div>
  )
}
