import { useMemo } from 'react'
import { useAuth } from './useAuth'
import api from '../services/api'

export const usePayment = () => {
  const { user } = useAuth()
  const { data } = api.useGetPaymentsQuery(user?.uid)
  const total = useMemo(() => data?.reduce((s, r) => {
    s = s + r.amount
    return s
  }, 0), [data])
  const transactions = useMemo(() => {
    return data?.map(x => ({ ...x, amount: x.amount / 100 }))
  }, [data])
  return {
    total: total / 100,
    transactions,
  }
}
