import React, { useState } from 'react';
import { BsPiggyBank } from 'react-icons/bs';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import api from '../services/api';
import { useAuth } from '../utils/useAuth';
import { toast } from 'react-toastify';
import { IoLogoUsd } from 'react-icons/io5';

export default function CardForm(props) {
  const { user } = useAuth()
  const [valid, setvalid] = useState(false)
  const stripe = useStripe();
  const elements = useElements();
  const [pay] = api.useCreatePaymentMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const card = elements.getElement(CardElement)
      const payload = { type: 'pi', amount: e.target.amount.value * 100, user: user?.uid }
      if (valid && user?.uid) {
        const { data } = await pay(payload)
        toast.info('Payment session created')
        if (data.clientSecret) {
          const { paymentIntent } = await stripe.confirmCardPayment(
            data.clientSecret,
            {
              payment_method: { card }
            }
          );
          console.log('succeed', paymentIntent)
          toast.success(`Payment Succeed ${paymentIntent.id}`)
        }
      } else {
        toast.error('Please input card number and topup amount')
      }
      setvalid(false)
      card.clear()
      e.target.amount.value = ''
    } catch (error) {
      console.error(error)
    }
  };

  const options = {
    hidePostalCode: true
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className='flex items-center space-x-4'>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-700">
            <IoLogoUsd />
          </span>
          <input type="number" name="amount" className="form-input pl-10 w-36 h-9" placeholder="USD" />
        </div>
        <CardElement
          options={options}
          className="form-input w-full h-9"
          onChange={(el) => el.complete && setvalid(el.complete)}
        />
      </div>
      <button type="submit" disabled={!stripe || !elements} className='bg-blue-500 px-3 py-1.5 rounded text-white hover:bg-blue-600 flex items-center'>
        <BsPiggyBank className='mr-2' /> Add balance
      </button>
    </form>
  );
};