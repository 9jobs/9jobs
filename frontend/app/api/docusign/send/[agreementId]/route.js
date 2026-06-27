import { NextResponse } from 'next/server';

import { requireAdminApiSession } from '@/lib/admin/auth/require-admin';
import { createDocuSignEnvelope } from '@/lib/docusign/client';
import {
  getAgreementById,
  getAgreementDocumentById,
  generateAndStoreAgreementPdf,
  getAgreementPdfBuffer,
} from '@/lib/agreements/service';

export const dynamic = 'force-dynamic';

export async function POST(request, { params }) {
  const session = await requireAdminApiSession(request);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const agreementId = (await params).agreementId;
  const agreementDocument = await getAgreementDocumentById(agreementId);

  if (!agreementDocument) {
    return NextResponse.json({ error: 'Agreement not found.' }, { status: 404 });
  }

  if (!agreementDocument.generatedPdfUrl) {
    await generateAndStoreAgreementPdf(agreementDocument);
  }

  const agreement = await getAgreementById(agreementId);
  const pdfBuffer = await getAgreementPdfBuffer(agreement, 'generated');
  const envelope = await createDocuSignEnvelope({
    agreement,
    pdfBuffer,
  });

  agreementDocument.docuSignEnvelopeId = envelope.envelopeId;
  agreementDocument.status = 'sent';
  agreementDocument.sentAt = new Date();
  agreementDocument.envelopeEvents.push({
    status: 'sent',
    payload: envelope,
  });
  await agreementDocument.save();

  return NextResponse.json({
    success: true,
    envelopeId: envelope.envelopeId,
  });
}
