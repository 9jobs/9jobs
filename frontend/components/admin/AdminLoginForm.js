'use client';

import { useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/admin/ToastProvider';

export default function AdminLoginForm() {
  const router = useRouter();
  const { pushToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsPending(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Unable to log in.');
        pushToast({ title: data.error || 'Unable to log in.', tone: 'error' });
        return;
      }

      pushToast({ title: 'Admin login successful.', tone: 'success' });
      startTransition(() => {
        router.push('/admin/dashboard');
        router.refresh();
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form className="admin-auth-card" onSubmit={handleSubmit}>
      <div>
        <p className="admin-auth-card__eyebrow">Secure Access</p>
        <h2>Admin Login</h2>
        <p className="admin-auth-card__text">
          Sign in to create, preview, send, and track DocuSign agreements for 9Jobs clients.
        </p>
      </div>

      <label className="admin-field">
        <span>Email</span>
        <input
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />
      </label>

      <label className="admin-field">
        <span>Password</span>
        <input
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
      </label>

      {error ? <p className="admin-error-text">{error}</p> : null}

      <button className="admin-primary-button admin-primary-button--full" disabled={isPending} type="submit">
        {isPending ? 'Signing in...' : 'Login'}
      </button>
    </form>
  );
}
