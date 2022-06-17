import React, { useEffect } from 'react'
import dayjs from 'dayjs';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Layout from '../../components/layout';
import Sidebar from '../../components/sidebar';
import { useAuth } from '../../utils/useAuth';
import { usePayment } from '../../utils/usePayment';
import CardForm from '../../components/cardForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);
export default function Payments() {
  const { authCheck } = useAuth()
  const { transactions, total } = usePayment()
  useEffect(() => {
    authCheck()
  }, []);
  return (
    <Layout className="admin-bg">
      <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-4 md:gap-5">
        <Sidebar />
        <div className='col-span-3 drop-shadow-lg bg-gray-100 rounded p-4 md:p-5 mt-10 md:mt-0 space-y-5 border border-gray-200 w-full'>
          <div className='flex justify-between'>
            <h1 className='text-xl font-bold text-gray-500'>Payments</h1>
            <div className='bg-gray-500 rounded text-white py-1 px-3'>Balance: ${total}</div>
          </div>
          <Elements stripe={stripePromise}>
            <CardForm />
          </Elements>
          <div className='bg-gray-200 p-4 rounded'>
            * Subscription is $5.00 USD (2 listings included) <br />
            * Every listing after that is $1.00
          </div>
          <hr />
          <h2 className='text-lg font-semibold text-gray-500'>Transactions:</h2>
          <table className='table-auto w-full'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {transactions?.map((x, i) => {
                const charge = x.charges.data[0]
                return <tr key={i}>
                  <td>{dayjs.unix(charge.created).format('MM/DD/YYYY')}</td>
                  <td>${x?.amount}</td>
                </tr>
              })}

            </tbody>

          </table>
        </div>
      </div>
    </Layout>
  )
}
