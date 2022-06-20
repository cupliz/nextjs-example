import connectionHandler from "../../db/knex";
const stripe = require("stripe")(process.env.STRIPE_SK);
// const tableName = 'payments'

const findCustomer = async ({ email, payment_method }) => {
  const customers = await stripe.customers.search({
    query: `email:'${email}'`,
  });
  if (customers.data.length) {
    return customers.data[0];
  } else {
    const customer = await stripe.customers.create({
      payment_method,
      email,
      invoice_settings: { default_payment_method: payment_method },
    });
    return customer;
  }
};

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      // const payments = await stripe.paymentIntents.search({
      //   query: `status:'succeeded' AND metadata['order_id']:'${req.query.uid}'`,
      // });
      const subscriptions = await stripe.subscriptions.search({
        query: `metadata['uid']:'${req.query.uid}'`,
      });
      return res.status(200).json(subscriptions.data);
    }
    if (req.method === "POST") {
      if (req.query.type == "sub") {
        const { uid, email, name, plan, payment_method } = req.body;
        const customer = await findCustomer({ email, payment_method });
        const payload = {
          customer: customer.id,
          items: [{ plan }],
          expand: ["latest_invoice.payment_intent"],
          metadata: { uid, email, name },
        };
        const subscription = await stripe.subscriptions.create(payload);
        return res.json(subscription?.latest_invoice?.payment_intent);
      }

      // if (req.query.type == 'pay') {
      //   const { amount, user } = req.body
      //   const paymentIntent = await stripe.paymentIntents.create({
      //     amount,
      //     currency: "usd",
      //     payment_method_types: ['card'],
      //     metadata: { order_id: user },
      //   });
      //   // const result = await req.db(table).insert({}).returning('id')
      //   return res.json({ clientSecret: paymentIntent.client_secret });
      // }
    }
    res.status(404).end();
  } catch (error) {
    res.status(500).json(error);
  }
};

export default connectionHandler()(handler);
