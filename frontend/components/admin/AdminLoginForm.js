'use client';

import { useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/admin/ToastProvider';

function getInitialMode(canSelfRegister) {
  return canSelfRegister ? 'signup' : 'signin';
}

export default function AdminLoginForm({ canSelfRegister = false, nextPath = '/admin/dashboard' }) {
  const router = useRouter();
  const { pushToast } = useToast();
  const [mode, setMode] = useState(getInitialMode(canSelfRegister));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsPending(true);

    try {
      const endpoint =
        mode === 'signup'
          ? '/api/admin/signup'
          : mode === 'forgot'
            ? '/api/admin/forgot-password'
            : '/api/admin/login';

      const payload =
        mode === 'signup'
          ? { name, email, password, confirmPassword }
          : mode === 'forgot'
            ? { email }
            : { email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Unable to log in.');
        pushToast({ title: data.error || 'Unable to log in.', tone: 'error' });
        return;
      }

      if (mode === 'forgot') {
        setMessage(data.message || 'If the account exists, a password reset link has been sent.');
        pushToast({ title: 'Password reset request accepted.', tone: 'success' });
        setMode('signin');
        return;
      }

      pushToast({
        title: mode === 'signup' ? 'Admin account created.' : 'Admin login successful.',
        tone: 'success',
      });
      startTransition(() => {
        router.push(nextPath || '/admin/dashboard');
        router.refresh();
      });
    } finally {
      setIsPending(false);
    }
  }

  const title =
    mode === 'signup'
      ? 'Create Admin Account'
      : mode === 'forgot'
        ? 'Forgot Password'
        : 'Admin Login';

  const description =
    mode === 'signup'
      ? 'Create the first protected 9Jobs admin account to manage agreements and signatures.'
      : mode === 'forgot'
        ? 'Enter your admin email and we will send a secure password reset link.'
        : 'Sign in to create, preview, send, and track DocuSign agreements for 9Jobs clients.';

  return (
    <form className="admin-auth-card" onSubmit={handleSubmit}>
      <div>
        <p className="admin-auth-card__eyebrow">Secure Access</p>
        <h2>{title}</h2>
        <p className="admin-auth-card__text">{description}</p>
      </div>

      <div className="admin-auth-card__switcher" role="tablist" aria-label="Admin auth modes">
        <button
          className={`admin-auth-card__switch ${mode === 'signin' ? 'admin-auth-card__switch--active' : ''}`}
          onClick={() => setMode('signin')}
          type="button"
        >
          Sign in
        </button>
        <button
          className={`admin-auth-card__switch ${mode === 'signup' ? 'admin-auth-card__switch--active' : ''}`}
          disabled={!canSelfRegister}
          onClick={() => setMode('signup')}
          type="button"
        >
          Sign up
        </button>
        <button
          className={`admin-auth-card__switch ${mode === 'forgot' ? 'admin-auth-card__switch--active' : ''}`}
          onClick={() => setMode('forgot')}
          type="button"
        >
          Forgot password
        </button>
      </div>

      {!canSelfRegister && mode === 'signup' ? (
        <p className="admin-auth-note">
          Admin signup is only available before the first admin account is created. Use sign in or forgot password instead.
        </p>
      ) : null}

      {mode === 'signup' ? (
        <label className="admin-field">
          <span>Full name</span>
          <input
            autoComplete="name"
            onChange={(event) => setName(event.target.value)}
            required
            type="text"
            value={name}
          />
        </label>
      ) : null}

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

      {mode !== 'forgot' ? (
        <label className="admin-field">
          <span>Password</span>
          <input
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>
      ) : null}

      {mode === 'signup' ? (
        <label className="admin-field">
          <span>Confirm password</span>
          <input
            autoComplete="new-password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            type="password"
            value={confirmPassword}
          />
        </label>
      ) : null}

      {error ? <p className="admin-error-text">{error}</p> : null}
      {message ? <p className="admin-auth-note">{message}</p> : null}

      <button className="admin-primary-button admin-primary-button--full" disabled={isPending} type="submit">
        {isPending
          ? mode === 'signup'
            ? 'Creating account...'
            : mode === 'forgot'
              ? 'Sending link...'
              : 'Signing in...'
          : mode === 'signup'
            ? 'Create admin account'
            : mode === 'forgot'
              ? 'Send reset link'
              : 'Login'}
      </button>

      <div className="admin-auth-card__footer">
        {mode !== 'signin' ? (
          <button className="admin-auth-card__footer-link" onClick={() => setMode('signin')} type="button">
            Back to sign in
          </button>
        ) : null}
        {mode === 'signin' ? (
          <button className="admin-auth-card__footer-link" onClick={() => setMode('forgot')} type="button">
            Forgot your password?
          </button>
        ) : null}
      </div>
    </form>
  );
}
