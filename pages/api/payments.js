import connectionHandler from '../../db/knex2';
const stripe = require('stripe')(process.env.STRIPE_SK)

const handler = async (req, res) => {
  try {
    const table = 'payments'
    if (req.method === 'GET') {
      if (req.query.user) {
        const { data } = await stripe.paymentIntents.search({
          query: `status:'succeeded' AND metadata['order_id']:'${req.query.user}'`,
        });
        res.status(200).json(data)
      } else {
        res.status(200).json([])
      }
    }
    if (req.method === 'POST') {
      const { amount, user } = req.body
      if (req.query.type == 'pi') {
        console.log(amount, user)
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
          payment_method_types: ['card'],
          metadata: {
            order_id: user,
          },
        });

        // const result = await req.db(table).insert({}).returning('id')
        return res.json({ clientSecret: paymentIntent.client_secret });
      }
      res.status(500).end()
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export default connectionHandler()(handler);
