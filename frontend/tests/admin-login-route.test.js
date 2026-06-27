import bcrypt from 'bcryptjs';
import { describe, expect, test } from '@jest/globals';

import { POST } from '@/app/api/admin/login/route';

describe('POST /api/admin/login', () => {
  test('logs the admin in with valid credentials', async () => {
    process.env.ADMIN_EMAIL = 'admin@9jobs.co';
    process.env.ADMIN_PASSWORD_HASH = await bcrypt.hash('super-secret', 10);
    process.env.JWT_SECRET = 'route-test-secret';

    const request = new Request('http://localhost/api/admin/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@9jobs.co',
        password: 'super-secret',
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(response.headers.get('set-cookie')).toContain('9jobs_admin_session=');
  });

  test('rejects invalid credentials', async () => {
    process.env.ADMIN_EMAIL = 'admin@9jobs.co';
    process.env.ADMIN_PASSWORD_HASH = await bcrypt.hash('super-secret', 10);
    process.env.JWT_SECRET = 'route-test-secret';

    const request = new Request('http://localhost/api/admin/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@9jobs.co',
        password: 'wrong-password',
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error).toBe('Invalid admin credentials.');
  });
});
