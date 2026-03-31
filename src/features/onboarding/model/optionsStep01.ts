import { OptionItem } from './types'

import Icon01 from '../assets/role-icon01.png'
import Icon02 from '../assets/role-icon02.png'
import Icon03 from '../assets/role-icon03.png'
import Icon04 from '../assets/role-icon04.png'
import Icon05 from '../assets/role-icon05.png'
import Icon06 from '../assets/role-icon06.png'

export const OPTION_ITEM: OptionItem[] = [
  {
    value: '유튜버',
    imgSrc: Icon01,
    label: '유튜버',
  },
  {
    value: '마케터',
    imgSrc: Icon02,
    label: '마케터',
  },

  {
    value: '브랜드 담당자',
    imgSrc: Icon03,
    label: '브랜드 담당자',
  },
  {
    value: 'MCN',
    imgSrc: Icon04,
    label: 'MCN / 에이전시',
  },
  {
    value: '콘텐츠기획자',
    imgSrc: Icon05,
    label: '콘텐츠기획자',
  },
  {
    value: '기타',
    imgSrc: Icon06,
    label: '기타',
  },
]
