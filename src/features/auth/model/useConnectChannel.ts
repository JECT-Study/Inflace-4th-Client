'use client'

import { useMutation } from '@tanstack/react-query'

import { useAuthStore } from '@/shared/api/authStore'
import { connectChannel } from '../api/channelApi'
import { useYoutubeConnectModal } from './useYoutubeConnectModal'

export function useConnectChannel() {
  const close = useYoutubeConnectModal((s) => s.close)

  return useMutation({
    mutationFn: connectChannel,
    onSuccess: async () => {
      try {
        const res = await fetch('/auth/refresh', { method: 'POST' })
        if (res.ok) {
          const { accessToken, user } = await res.json()
          useAuthStore.getState().setAuth(accessToken, user)
        }
      } catch {
        // refresh 실패 시 다음 요청에서 인터셉터가 재시도
      }
      close()
    },
  })
}
