const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  try {
    console.log("Inside_payment_routes.js", req.body);
    const { items, payment_methods } = req.body;

    const line_items = items.map(item => ({
      price_data: {
        currency: item.currency || 'usd',
        product_data: { name: item.name },
        unit_amount: item.amount,
      },
      quantity: item.quantity,
    }));

    console.log("line_items", line_items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: payment_methods || ['card'],
      mode: 'payment',
      line_items,
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    console.log("session", session);
    res.json({ id: session.id, url: session.url }); // Return session ID and URL for redirection
  } catch (error) {
    console.error("Error_Inside_payment_routes.js:", error);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
});

module.exports = router;
