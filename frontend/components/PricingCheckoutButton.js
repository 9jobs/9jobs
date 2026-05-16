"use client";

import { CreditCard } from "lucide-react";
import getStripe from "../utils/stripe";

export default function PricingCheckoutButton({ plan, className }) {
  const handleCheckout = async () => {
    try {
      const stripe = await getStripe();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planName: plan.name,
          price: plan.price,
          period: plan.period,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const session = await response.json();
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate checkout. Please try again.");
    }
  };

  return (
    <button onClick={handleCheckout} className={className}>
      Pay Now <CreditCard size={17} style={{ marginLeft: '8px' }} />
    </button>
  );
}
