import { describe, expect, test } from '@jest/globals';

import { buildAgreementTemplate } from '@/lib/agreements/template';

describe('agreement template', () => {
  test('injects dynamic agreement fields into the master template', () => {
    const document = buildAgreementTemplate({
      clientName: 'Jane Client',
      clientEmail: 'jane@example.com',
      clientPhone: '+61 400 111 222',
      providerName: '9 Jobs Pty Ltd',
      providerEmail: 'provider@9jobs.co',
      providerPhone: '+61 422 279 428',
      providerSignatureName: 'Rahul Sharma',
      agreementDate: '2026-06-27',
      packageName: 'Premium Job Search',
      servicePrice: '999',
      weeklyJobTarget: '65',
      initialTerm: '4 weeks',
      notes: 'Priority applications for Melbourne operations roles.',
    });

    expect(document.title).toBe('9 Jobs Service Contract');
    expect(document.sections.some((section) => section.heading === 'Scope of Services')).toBe(true);
    expect(document.signatureBlocks.customer.name).toBe('Jane Client');
    expect(document.summaryText).toContain('Premium Job Search');
    expect(document.summaryText).toContain('999');
    expect(document.summaryText).toContain('65');
    expect(document.summaryText).toContain('Priority applications for Melbourne operations roles.');
  });

  test('omits notes block when notes are blank', () => {
    const document = buildAgreementTemplate({
      clientName: 'Jane Client',
      clientEmail: 'jane@example.com',
      clientPhone: '+61 400 111 222',
      providerName: '9 Jobs Pty Ltd',
      providerEmail: 'provider@9jobs.co',
      providerPhone: '+61 422 279 428',
      providerSignatureName: 'Rahul Sharma',
      agreementDate: '2026-06-27',
      packageName: 'Premium Job Search',
      servicePrice: '999',
      weeklyJobTarget: '65',
      initialTerm: '4 weeks',
      notes: '',
    });

    expect(document.sections.some((section) => section.heading === 'Notes')).toBe(false);
  });
});
