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

  let generatedPdfUrl = '';
  let generatedPdfPath = '';

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const upload = await uploadPrivatePdf({
        folder: `agreements/${agreementDocument._id}`,
        fileName: 'generated-agreement.pdf',
        buffer,
      });
      generatedPdfUrl = upload.url;
      generatedPdfPath = upload.path;
    } else {
      // Fallback: store as data URL directly in database
      generatedPdfUrl = `data:application/pdf;base64,${buffer.toString('base64')}`;
      generatedPdfPath = `db://agreements/${agreementDocument._id}/generated-agreement.pdf`;
    }
  } catch (error) {
    console.error('Failed to upload generated PDF, falling back to db storage:', error);
    generatedPdfUrl = `data:application/pdf;base64,${buffer.toString('base64')}`;
    generatedPdfPath = `db://agreements/${agreementDocument._id}/generated-agreement.pdf`;
  }

  agreementDocument.generatedPdfUrl = generatedPdfUrl;
  agreementDocument.generatedPdfPath = generatedPdfPath;
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

  // Parse direct base64 data URLs from database fallback
  if (url.startsWith('data:application/pdf;base64,')) {
    const base64Data = url.substring(url.indexOf(',') + 1);
    return Buffer.from(base64Data, 'base64');
  }

  return fetchBlobBuffer(url);
}

export async function attachSignedAgreementPdf(agreementDocument) {
  const signedBuffer = await downloadCompletedEnvelopePdf(agreementDocument.docuSignEnvelopeId);
  
  let signedPdfUrl = '';
  let signedPdfPath = '';

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const upload = await uploadPrivatePdf({
        folder: `agreements/${agreementDocument._id}`,
        fileName: 'signed-agreement.pdf',
        buffer: signedBuffer,
      });
      signedPdfUrl = upload.url;
      signedPdfPath = upload.path;
    } else {
      signedPdfUrl = `data:application/pdf;base64,${signedBuffer.toString('base64')}`;
      signedPdfPath = `db://agreements/${agreementDocument._id}/signed-agreement.pdf`;
    }
  } catch (error) {
    console.error('Failed to upload signed PDF, falling back to db storage:', error);
    signedPdfUrl = `data:application/pdf;base64,${signedBuffer.toString('base64')}`;
    signedPdfPath = `db://agreements/${agreementDocument._id}/signed-agreement.pdf`;
  }

  agreementDocument.signedPdfUrl = signedPdfUrl;
  agreementDocument.signedPdfPath = signedPdfPath;
  agreementDocument.signedAt = new Date();
  await agreementDocument.save();

  return signedBuffer;
}
