import { NextResponse } from 'next/server';

import { getAdminSessionCookieOptions } from '@/lib/admin/auth/cookies';
import { verifyAdminCredentials } from '@/lib/admin/auth/credentials';
import { ADMIN_SESSION_COOKIE_NAME } from '@/lib/admin/auth/constants';
import { adminLoginSchema } from '@/lib/admin/auth/login-schema';
import { enforceLoginRateLimit } from '@/lib/admin/auth/rate-limit';
import { createAdminSessionToken } from '@/lib/admin/auth/session';

function getRequestKey(request) {
  return (
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'local'
  );
}

export async function POST(request) {
  try {
    const rateLimit = enforceLoginRateLimit(getRequestKey(request));

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many login attempts. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'retry-after': String(rateLimit.retryAfterSeconds),
          },
        }
      );
    }

    const body = await request.json();
    const credentials = adminLoginSchema.parse(body);
    const isValid = await verifyAdminCredentials(credentials);

    if (!isValid) {
      return NextResponse.json(
        {
          error: 'Invalid admin credentials.',
        },
        {
          status: 401,
        }
      );
    }

    const token = await createAdminSessionToken({
      email: credentials.email.trim().toLowerCase(),
    });

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set(
      ADMIN_SESSION_COOKIE_NAME,
      token,
      getAdminSessionCookieOptions()
    );

    return response;
  } catch (error) {
    if (error?.name === 'ZodError') {
      return NextResponse.json(
        {
          error: 'Invalid login payload.',
        },
        {
          status: 400,
        }
      );
    }

    console.error('Admin login failed:', error);

    return NextResponse.json(
      {
        error: 'Unable to complete admin login.',
      },
      {
        status: 500,
      }
    );
  }
}
