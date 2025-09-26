import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { apiService, handleApiError } from '../services/api'
import { login as loginAction, logout as logoutAction } from '../features/auth/authSlice'
import type { RootState } from '../app/store'

export const useAuth = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  const loginMutation = useMutation({
    mutationFn: apiService.login,
    onSuccess: () => {
      dispatch(loginAction())
    },
    onError: (error) => {
      console.error('Login failed:', handleApiError(error))
    },
  })

  const logoutMutation = useMutation({
    mutationFn: apiService.logout,
    onSuccess: () => {
      dispatch(logoutAction())
      queryClient.clear()
    },
  })

  return {
    isAuthenticated,
    isLoading: false,

    login: loginMutation.mutate,
    logout: logoutMutation.mutate,

    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    isLoggingOut: logoutMutation.isPending,
  }
}