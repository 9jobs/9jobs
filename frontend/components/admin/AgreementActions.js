'use client';

import { useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/admin/ToastProvider';

export default function AgreementActions({ agreementId, hasGeneratedPdf, hasSignedPdf, isCompleted }) {
  const router = useRouter();
  const { pushToast } = useToast();
  const [pendingAction, setPendingAction] = useState('');

  async function runAction(action, url) {
    setPendingAction(action);

    try {
      const response = await fetch(url, {
        method: 'POST',
      });
      const data = await response.json();

      if (!response.ok) {
        pushToast({ title: data.error || `Unable to ${action}.`, tone: 'error' });
        return;
      }

      pushToast({
        title: action === 'generate' ? 'Agreement preview generated.' : 'Agreement sent via DocuSign.',
        tone: 'success',
      });
      startTransition(() => {
        router.refresh();
      });
    } finally {
      setPendingAction('');
    }
  }

  return (
    <div className="admin-actions-row">
      <button
        className="admin-primary-button"
        disabled={pendingAction === 'generate'}
        onClick={() => runAction('generate', `/api/agreements/${agreementId}/generate-pdf`)}
        type="button"
      >
        {pendingAction === 'generate' ? 'Generating...' : hasGeneratedPdf ? 'Regenerate Preview' : 'Generate Preview'}
      </button>

      <button
        className="admin-dark-button"
        disabled={pendingAction === 'send'}
        onClick={() => runAction('send', `/api/docusign/send/${agreementId}`)}
        type="button"
      >
        {pendingAction === 'send' ? 'Sending...' : 'Send via DocuSign'}
      </button>

      {hasSignedPdf ? (
        <a className="admin-ghost-button admin-ghost-button--link" href={`/api/docusign/download/${agreementId}`}>
          Download Signed PDF
        </a>
      ) : null}

      {isCompleted && hasSignedPdf ? (
        <a
          className="admin-ghost-button admin-ghost-button--link"
          href={`/api/agreements/${agreementId}/preview-pdf?variant=signed`}
          rel="noreferrer"
          target="_blank"
        >
          View Signed PDF
        </a>
      ) : null}
    </div>
  );
}
