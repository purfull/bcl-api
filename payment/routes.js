const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { items, payment_methods, customer_info } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items array is required" });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: item.currency || "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.amount),
      },
      quantity: item.quantity || 1,
    }));
    console.log("items", line_items);

    const customer = await stripe.customers.create({
      name: customer_info.name,
      email: customer_info.email,
      phone: customer_info.phone,
      address: customer_info.address,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: payment_methods || ["card"],
      mode: "payment",
      line_items,
      customer: customer?.id,
      success_url:
        "http://localhost:3000/success-page?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ✅ Handle completed checkout session
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      try {
        const orderDetails = JSON.parse(session.metadata.order_details);

        // Call your createOrder function here
        await Order.create({
          customer_detials: {
            email: session.customer_details?.email,
            stripeCustomerId: session.customer,
            name: customer_info?.name,
            phone: customer_info?.phone,
            address: customer_info?.address,
          },
          order_detials: orderDetails,
          asign_to: null,
          type: "online",
          remarks: session.metadata.notes,
          status: "paid",
        });

        console.log("✅ Order created for session:", session.id);
      } catch (err) {
        console.error("❌ Failed to create order from webhook:", err);
      }
    }

    res.status(200).end();
  }
);

router.get("/get-session", async (req, res) => {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["customer_details", "line_items"],
    });

    res.json(session);
  } catch (error) {
    console.error("Error fetching Stripe session:", error);
    res.status(500).json({ error: "Unable to retrieve session" });
  }
});
module.exports = router;
