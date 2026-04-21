import { axiosInstance } from '@/shared/api'
import { UserRole, Need } from '../model/types'

export const postOnboarding = (data: { role: UserRole; need: Need[] }) =>
  axiosInstance.post('user/onboarding', data)
