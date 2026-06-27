import { NextResponse } from 'next/server';

import { requireAdminApiSession } from '@/lib/admin/auth/require-admin';
import { agreementInputSchema } from '@/lib/agreements/schema';
import { createAgreement, listAgreements } from '@/lib/agreements/service';

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
    const agreement = await createAgreement(payload);

    return NextResponse.json(
      {
        agreement,
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
