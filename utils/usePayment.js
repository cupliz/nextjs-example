import { useMemo } from 'react'
import { useAuth } from './useAuth'
import api from '../services/api'


export const usePayment = () => {
  const { user } = useAuth();
  const params = user?.email ? `uid=${user?.uid}` : "";
  const getPayments = api.useGetPaymentsQuery(params);
  return {
    getPayments,
    active: getPayments.data?.find((x) => x.status == "active"),
    data: getPayments.data,
  };
};

// export const usePayment = () => {
//   const { user } = useAuth()
//   const { data } = api.useGetPaymentsQuery(user?.email)
//   const total = useMemo(() => data?.reduce((s, r) => {
//     s = s + r.amount
//     return s
//   }, 0), [data])
//   const transactions = useMemo(() => {
//     return data?.map(x => ({ ...x, amount: x.amount / 100 }))
//   }, [data])
//   return {
//     total: total / 100,
//     transactions,
//   }
// }
