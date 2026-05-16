const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/api/create-checkout-session", async (req, res) => {
  const { planName, price, period } = req.body;

  // Convert price string like "$25" to cents
  const unitAmount = parseInt(price.replace(/[^0-9]/g, "")) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `9Jobs ${planName} Plan`,
              description: `${planName} plan - ${period}`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.APP_BASE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_BASE_URL || "http://localhost:3000"}/pricing`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
