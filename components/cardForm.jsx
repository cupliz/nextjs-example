import React, { useState } from "react";
import { IoCardOutline, IoRefresh, IoReload } from "react-icons/io5";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import api from "../services/api";
import { useAuth } from "../utils/useAuth";
import { handleError } from "../utils/helper";

export default function CardForm({ refetch }) {
  const { user } = useAuth();
  const [valid, setvalid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [sub, { isLoading }] = api.useCreatePaymentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!stripe || !elements) {
        return;
      }
      const card = elements.getElement(CardElement);
      if (valid && user?.uid) {
        const billing_details = {
          email: user?.email,
          name: user?.fullname,
        };
        const paymentPayload = {
          type: "card",
          billing_details,
          card,
        };
        const result = await stripe.createPaymentMethod(paymentPayload);
        if (result?.paymentMethod) {
          const payload = Object.assign(
            {
              type: "sub",
              plan: "price_1LCiecIo6oSds8ab305Ochas",
              payment_method: result.paymentMethod.id,
              uid: user?.uid,
            },
            billing_details
          );
          const { data } = await sub(payload);
          if (data.status === "requires_action") {
            const { paymentIntent } = await stripe.confirmCardPayment(
              data.clientSecret
            );
            toast.success(`Subscribed! ${paymentIntent.id}`);
          } else {
            toast.success(`Subscribed!`);
          }
        }
      } else {
        toast.error("Please input card fields");
      }
      setvalid(false);
      card.clear();
    } catch (error) {
      handleError(error);
    }
  };

  const options = {
    hidePostalCode: true,
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4">
        {/* <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-700">
            <IoLogoUsd />
          </span>
          <input
            type="number"
            name="amount"
            className="form-input pl-10 w-36 h-9"
            placeholder="USD"
          />
        </div> */}
        <CardElement
          options={options}
          className="form-input w-full h-9"
          onChange={(el) => el.complete && setvalid(el.complete)}
        />
      </div>
      {isLoading ? (
        <button
          disabled={true}
          className="bg-blue-500 px-3 py-1.5 rounded text-white hover:bg-blue-600 flex items-center"
        >
          <IoReload className="mr-2 animate-spin" /> Processing...
        </button>
      ) : (
        <button
          type="submit"
          disabled={!stripe || !elements || isLoading}
          className="bg-blue-500 px-3 py-1.5 rounded text-white hover:bg-blue-600 flex items-center"
        >
          <IoCardOutline className="mr-2" /> Subscribe
        </button>
      )}
    </form>
  );
}

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const card = elements.getElement(CardElement);
//     const payload = {
//       type: "pay",
//       amount: e.target.amount.value * 100,
//       user: user?.uid,
//     };
//     if (valid && user?.uid) {
//       const { data } = await pay(payload);
//       toast.info("Payment session created");
//       if (data.clientSecret) {
//         const { paymentIntent } = await stripe.confirmCardPayment(
//           data.clientSecret,
//           {
//             payment_method: { card },
//           }
//         );
//         toast.success(`Payment Succeed ${paymentIntent.id}`);
//       }
//     } else {
//       toast.error("Please input card number and topup amount");
//     }
//     setvalid(false);
//     card.clear();
//     e.target.amount.value = "";
//   } catch (error) {
//     console.error(error);
//   }
// };
