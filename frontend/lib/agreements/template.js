const FIXED_PROVIDER = {
  legalName: '9 Jobs Pty Ltd',
  abn: '83679842972',
  phone: '+61 422 279 428',
};

function createSection(heading, paragraphs) {
  return {
    heading,
    paragraphs,
  };
}

export function buildAgreementTemplate(input) {
  const notes = input.notes?.trim();

  const sections = [
    createSection('Scope of Services', [
      'Creating a dedicated email address solely for the purpose of applying for jobs.',
      `Submitting job applications on behalf of ${input.clientName} using approved profile information and application materials.`,
    ]),
    createSection('Payment Terms', [
      `The customer agrees to pay ${input.servicePrice} for the ${input.packageName} package for the initial term of ${input.initialTerm}.`,
      'Any continuing services beyond the initial term will require renewed approval and payment in advance.',
    ]),
    createSection('Payment Schedule, Cost Structure and Service Oversight', [
      `The agreed package is ${input.packageName} at ${input.servicePrice}.`,
      `9 Jobs will target approximately ${input.weeklyJobTarget} job applications per week, subject to role availability and profile fit.`,
    ]),
    createSection('Access and Information', [
      'Where necessary, the customer will provide accurate access details for relevant job platforms and related application channels.',
      'Access details are used strictly for job-application purposes and are not modified or reused for unrelated activities.',
    ]),
    createSection('Use of CV and Other Application Materials', [
      'The resume/CV, cover letter, and related application materials will be mutually agreed before submission.',
      'Once an application is submitted, those materials cannot be retroactively changed for that application.',
    ]),
    createSection('Job Application Targets', [
      `9 Jobs will endeavour to submit a minimum weekly target of ${input.weeklyJobTarget} applications.`,
      'Applications may include roles identified by the customer as well as similar opportunities aligned to the agreed package.',
    ]),
    createSection('Customer Responsibilities', [
      `${input.clientName} must ensure all supplied information is accurate, current, and suitable for use in job applications.`,
      'The customer is responsible for promptly responding to recruiters or employers and for interview preparation and performance.',
    ]),
    createSection('Availability', [
      'The service provider is generally available during standard business hours, Monday to Friday.',
      'Messages received outside those hours will be handled on the next business day.',
    ]),
    createSection('Privacy, Confidentiality, and Marketing', [
      'Client information is treated as confidential and used only for the agreed services.',
      'Information is shared only with employers or job platforms as part of the application process. Testimonials or marketing references require explicit client consent.',
    ]),
    createSection('Denial of Services', [
      'The service provider may refuse or pause services where required information is not supplied, where supplied information appears inaccurate, or where requested actions fall outside the agreed service scope.',
    ]),
    createSection('Dispute Resolution', [
      'In the event of any disagreement, both parties agree to first attempt to resolve the matter in good faith through direct discussion, mediation, or arbitration.',
    ]),
    createSection('Governing Law', [
      'This agreement is governed by the laws of Australia.',
    ]),
    createSection('Termination and Refunds', [
      'Either party may terminate this agreement by providing written notice.',
      'Unless otherwise required by law, fees for services already delivered, commenced, or reserved are non-refundable.',
    ]),
    createSection('Entire Agreement', [
      'This document records the complete agreement between the customer and the service provider in relation to the services described above.',
    ]),
    createSection('Amendments', [
      'Any amendment to this agreement must be confirmed in writing by both parties.',
    ]),
  ];

  if (notes) {
    sections.push(
      createSection('Notes', [
        notes,
      ])
    );
  }

  const summaryText = [
    `Agreement date: ${input.agreementDate}.`,
    `Customer: ${input.clientName} (${input.clientEmail}, ${input.clientPhone}).`,
    `Service provider contact: ${input.providerName || FIXED_PROVIDER.legalName} (${input.providerEmail}, ${input.providerPhone}).`,
    `Package: ${input.packageName}.`,
    `Price: ${input.servicePrice}.`,
    `Weekly job target: ${input.weeklyJobTarget}.`,
    `Initial term: ${input.initialTerm}.`,
    notes ? `Notes: ${notes}` : null,
  ]
    .filter(Boolean)
    .join(' ');

  return {
    title: '9 Jobs Service Contract',
    provider: FIXED_PROVIDER,
    agreementDate: input.agreementDate,
    summaryText,
    sections,
    signatureBlocks: {
      provider: {
        label: 'Service Provider',
        name: input.providerSignatureName,
        email: input.providerEmail,
        phone: input.providerPhone,
      },
      customer: {
        label: 'Customer',
        name: input.clientName,
        email: input.clientEmail,
        phone: input.clientPhone,
      },
    },
  };
}
