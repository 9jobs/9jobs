"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // You could verify the session here with your backend
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <main className="fj-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
      <div className="fj-container">
        <CheckCircle size={80} color="#4ade80" style={{ margin: '0 auto 24px' }} />
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Payment Successful!</h1>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto 32px' }}>
          Thank you for your purchase. Your plan has been activated. We've sent a confirmation email to your registered address.
        </p>
        <Link href="/" className="fj-button fj-button--dark">
          Go to Dashboard <ArrowRight size={17} style={{ marginLeft: '8px' }} />
        </Link>
      </div>
    </main>
  );
}
