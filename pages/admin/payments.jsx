import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { HiBadgeCheck, HiBan, HiOutlineRefresh } from "react-icons/hi";
import Layout from "../../components/layout";
import Sidebar from "../../components/sidebar";
import CardForm from "../../components/cardForm";
import { useAuth } from "../../utils/useAuth";
import { usePayment } from "../../utils/usePayment";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

export default function Payments() {
  const { authCheck } = useAuth();
  const { getPayments, active, data: subs } = usePayment();

  const refetch = () => {
    getPayments.refetch();
  };
  useEffect(() => {
    authCheck();
  }, []);
  return (
    <Layout className="admin-bg">
      <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-4 md:gap-5">
        <Sidebar />
        <div className="col-span-3 drop-shadow-lg bg-gray-100 rounded p-4 md:p-5 mt-10 md:mt-0 space-y-5 border border-gray-200 w-full">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-gray-500">Subscriptions</h1>
            {!!active ? (
              <div className="flex text-green-500">
                <HiBadgeCheck className="w-6 h-6 mr-2" /> Active
              </div>
            ) : (
              <div className="flex text-red-500">
                <HiBan className="w-6 h-6 mr-2" /> Inactive
              </div>
            )}
          </div>
          {!active && (
            <Elements stripe={stripePromise}>
              <CardForm refetch={refetch} />
            </Elements>
          )}
          <div className="bg-gray-200 p-4 rounded">
            * Subscription is $5.00 USD (2 listings included) <br />* Every
            listing after that is $1.00
          </div>
          <hr />
          <button
            className="bg-blue-500 text-white py-1 px-2 rounded flex items-center space-x-1"
            onClick={refetch}
          >
            <HiOutlineRefresh className="w-5 h-5" /> <span>Refresh</span>
          </button>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Period</th>
                <th>End</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {subs?.map((x, i) => {
                const { current_period_start, current_period_end, status } = x;
                return (
                  <tr key={i}>
                    <td>
                      {dayjs.unix(current_period_start).format("MM/DD/YYYY")}
                    </td>
                    <td>
                      {dayjs.unix(current_period_end).format("MM/DD/YYYY")}
                    </td>
                    <td>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
