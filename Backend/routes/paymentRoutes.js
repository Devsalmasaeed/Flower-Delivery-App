const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ✅ Create Checkout Session
router.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err.message);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
});

// ✅ Get Session Data
router.get("/session/:id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    res.status(200).json(session);
  } catch (err) {
    console.error("Fetch session error:", err.message);
    res.status(400).json({ error: "Unable to fetch session" });
  }
});

module.exports = router;
