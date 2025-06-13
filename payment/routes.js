const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); 

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, payment_methods } = req.body;

console.log(req.body, "qqqqqqqq")
    const line_items = await items?.map(item => ({
      price_data: {
        currency: item.currency || 'usd',
        product_data: { name: item.name },
        unit_amount: item.amount,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: payment_methods || ['card'], 
      mode: 'payment',
      line_items,
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
console.log(session.id, "iddddd")
    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
});

router.get('/get-session', async (req, res) => {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['customer_details', 'line_items'],
    });

    res.json(session);
  } catch (error) {
    console.error('Error fetching Stripe session:', error);
    res.status(500).json({ error: 'Unable to retrieve session' });
  }
});
module.exports = router;
