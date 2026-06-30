'use client';

import { useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';

import { agreementInputSchema } from '@/lib/agreements/schema';
import { useToast } from '@/components/admin/ToastProvider';

const initialState = {
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  providerName: '',
  providerEmail: '',
  providerPhone: '',
  providerSignatureName: '',
  agreementDate: new Date().toISOString().slice(0, 10),
  packageName: '',
  servicePrice: '',
  weeklyJobTarget: '',
  initialTerm: '',
  notes: '',
};

const sections = [
  {
    title: 'Client Details',
    fields: ['clientName', 'clientEmail', 'clientPhone'],
  },
  {
    title: 'Service Provider Details',
    fields: ['providerName', 'providerEmail', 'providerPhone', 'providerSignatureName'],
  },
  {
    title: 'Agreement Details',
    fields: ['agreementDate', 'packageName', 'servicePrice', 'weeklyJobTarget', 'initialTerm', 'notes'],
  },
];

const labels = {
  clientName: 'Client Name',
  clientEmail: 'Client Email',
  clientPhone: 'Client Phone',
  providerName: 'Provider Name',
  providerEmail: 'Provider Email',
  providerPhone: 'Provider Phone',
  providerSignatureName: 'Provider Signature Name',
  agreementDate: 'Agreement Date',
  packageName: 'Package Name',
  servicePrice: 'Service Price',
  weeklyJobTarget: 'Weekly Job Target',
  initialTerm: 'Initial Term',
  notes: 'Notes',
};

function getInputType(field) {
  if (field.includes('Email')) return 'email';
  if (field.includes('Date')) return 'date';
  return 'text';
}

export default function AgreementForm() {
  const router = useRouter();
  const { pushToast } = useToast();
  const [values, setValues] = useState(initialState);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isPending, setIsPending] = useState(false);

  function updateField(field, value) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validation = agreementInputSchema.safeParse(values);

    if (!validation.success) {
      const nextErrors = {};

      validation.error.issues.forEach((issue) => {
        nextErrors[issue.path[0]] = issue.message;
      });

      setFieldErrors(nextErrors);
      pushToast({ title: 'Please fix the highlighted agreement fields.', tone: 'error' });
      return;
    }

    setFieldErrors({});
    setIsPending(true);

    try {
      const response = await fetch('/api/agreements', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(validation.data),
      });
      const data = await response.json();

      if (!response.ok) {
        pushToast({ title: data.error || 'Unable to create agreement.', tone: 'error' });
        return;
      }

      pushToast({ title: 'Agreement created.', tone: 'success' });
      startTransition(() => {
        router.push(`/admin/agreements/${data.agreement._id}`);
        router.refresh();
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <section className="admin-panel admin-panel--hero">
        <div className="admin-panel__header admin-panel__header--stack">
          <div>
            <h2>Agreement Workspace</h2>
            <p>Fill the details once. We generate the same PDF for preview and DocuSign delivery.</p>
          </div>
        </div>
        <div className="admin-chip-row">
          <span className="admin-chip">Blank form</span>
          <span className="admin-chip">Instant PDF preview</span>
          <span className="admin-chip">DocuSign ready</span>
        </div>
      </section>

      {sections.map((section) => (
        <section className="admin-panel" key={section.title}>
          <h2>{section.title}</h2>
          <div className="admin-form-grid">
            {section.fields.map((field) => (
              <label className={`admin-field ${field === 'notes' ? 'admin-field--full' : ''}`} key={field}>
                <span>{labels[field]}</span>
                {field === 'notes' ? (
                  <textarea
                    onChange={(event) => updateField(field, event.target.value)}
                    rows={5}
                    value={values[field]}
                  />
                ) : (
                  <input
                    onChange={(event) => updateField(field, event.target.value)}
                    type={getInputType(field)}
                    value={values[field]}
                  />
                )}
                {fieldErrors[field] ? <small className="admin-error-text">{fieldErrors[field]}</small> : null}
              </label>
            ))}
          </div>
        </section>
      ))}

      <div className="admin-form-actions">
        <button className="admin-primary-button" disabled={isPending} type="submit">
          {isPending ? 'Creating...' : 'Create Agreement'}
        </button>
      </div>
    </form>
  );
}
