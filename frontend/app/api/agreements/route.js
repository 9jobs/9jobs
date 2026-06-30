import { NextResponse } from 'next/server';

import { requireAdminApiSession } from '@/lib/admin/auth/require-admin';
import { agreementInputSchema } from '@/lib/agreements/schema';
import {
  createAgreement,
  deleteAllAgreements,
  generateAndStoreAgreementPdf,
  getAgreementDocumentById,
  listAgreements,
} from '@/lib/agreements/service';

export const dynamic = 'force-dynamic';

function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
}

export async function GET(request) {
  const session = await requireAdminApiSession(request);

  if (!session) {
    return unauthorizedResponse();
  }

  const agreements = await listAgreements();

  return NextResponse.json({
    agreements,
  });
}

export async function POST(request) {
  const session = await requireAdminApiSession(request);

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const payload = agreementInputSchema.parse(await request.json());
    const createdAgreement = await createAgreement(payload);
    const agreementDocument = await getAgreementDocumentById(createdAgreement._id);

    if (!agreementDocument) {
      throw new Error('Agreement not found after creation.');
    }

    const result = await generateAndStoreAgreementPdf(agreementDocument);

    return NextResponse.json(
      {
        agreement: result.agreement,
        previewUrl: `/api/agreements/${result.agreement._id}/preview-pdf`,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error?.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid agreement payload.' }, { status: 400 });
    }

    console.error('Unable to create agreement:', error);
    return NextResponse.json({ error: 'Unable to create agreement.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const session = await requireAdminApiSession(request);

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const deletedCount = await deleteAllAgreements();

    return NextResponse.json({
      deletedCount,
      message: deletedCount ? 'Old agreements removed.' : 'No agreements found to remove.',
    });
  } catch (error) {
    console.error('Unable to remove agreements:', error);
    return NextResponse.json({ error: 'Unable to remove agreements.' }, { status: 500 });
  }
}
