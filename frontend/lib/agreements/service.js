import connectDB from '@/utils/db';
import Agreement from '@/models/Agreement';
import { generateAgreementPdfBuffer } from '@/lib/agreements/pdf';
import { serializeAgreement } from '@/lib/agreements/serialize';
import { uploadPrivatePdf, fetchBlobBuffer } from '@/lib/storage/blob';
import { downloadCompletedEnvelopePdf } from '@/lib/docusign/client';

export async function listAgreements() {
  await connectDB();
  const agreements = await Agreement.find({}).sort({ createdAt: -1 });
  return agreements.map(serializeAgreement);
}

export async function getAgreementById(id) {
  await connectDB();
  const agreement = await Agreement.findById(id);
  return agreement ? serializeAgreement(agreement) : null;
}

export async function getAgreementDocumentById(id) {
  await connectDB();
  return Agreement.findById(id);
}

export async function createAgreement(payload) {
  await connectDB();
  const agreement = await Agreement.create({
    ...payload,
    notes: payload.notes || '',
    status: 'draft',
  });

  return serializeAgreement(agreement);
}

export async function updateAgreementById(id, updates) {
  await connectDB();
  const agreement = await Agreement.findByIdAndUpdate(id, updates, {
    new: true,
  });

  return agreement ? serializeAgreement(agreement) : null;
}

export async function generateAndStoreAgreementPdf(agreementDocument) {
  const buffer = await generateAgreementPdfBuffer({
    ...agreementDocument.toObject(),
    _id: String(agreementDocument._id),
  });
  const upload = await uploadPrivatePdf({
    folder: `agreements/${agreementDocument._id}`,
    fileName: 'generated-agreement.pdf',
    buffer,
  });

  agreementDocument.generatedPdfUrl = upload.url;
  agreementDocument.generatedPdfPath = upload.path;
  agreementDocument.status = agreementDocument.status === 'draft' ? 'previewed' : agreementDocument.status;
  await agreementDocument.save();

  return {
    agreement: serializeAgreement(agreementDocument),
    buffer,
  };
}

export async function getAgreementPdfBuffer(agreement, variant = 'generated') {
  const url = variant === 'signed' ? agreement.signedPdfUrl : agreement.generatedPdfUrl;

  if (!url) {
    return null;
  }

  return fetchBlobBuffer(url);
}

export async function attachSignedAgreementPdf(agreementDocument) {
  const signedBuffer = await downloadCompletedEnvelopePdf(agreementDocument.docuSignEnvelopeId);
  const upload = await uploadPrivatePdf({
    folder: `agreements/${agreementDocument._id}`,
    fileName: 'signed-agreement.pdf',
    buffer: signedBuffer,
  });

  agreementDocument.signedPdfUrl = upload.url;
  agreementDocument.signedPdfPath = upload.path;
  agreementDocument.signedAt = new Date();
  await agreementDocument.save();

  return signedBuffer;
}
