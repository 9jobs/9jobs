import { beforeEach, describe, expect, jest, test } from '@jest/globals';

const authenticateAdminUser = jest.fn();
const createInitialAdminUser = jest.fn();
const requestAdminPasswordReset = jest.fn();
const resetAdminPassword = jest.fn();

async function loadAuthRoutes() {
  jest.resetModules();
  jest.doMock('@/lib/admin/auth/admin-user-service', () => ({
    authenticateAdminUser,
    createInitialAdminUser,
    requestAdminPasswordReset,
    resetAdminPassword,
  }));

  const [{ POST: forgotPasswordPost }, { POST: loginPost }, { POST: resetPasswordPost }, { POST: signupPost }] =
    await Promise.all([
      import('@/app/api/admin/forgot-password/route'),
      import('@/app/api/admin/login/route'),
      import('@/app/api/admin/reset-password/route'),
      import('@/app/api/admin/signup/route'),
    ]);

  return {
    forgotPasswordPost,
    loginPost,
    resetPasswordPost,
    signupPost,
  };
}

describe('admin auth routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'route-test-secret';
  });

  test('logs an admin in with valid credentials', async () => {
    const { loginPost } = await loadAuthRoutes();
    authenticateAdminUser.mockResolvedValue({
      id: 'admin-1',
      email: 'admin@9jobs.co',
      name: '9Jobs Admin',
    });

    const request = new Request('http://localhost/api/admin/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': '10.0.0.1',
      },
      body: JSON.stringify({
        email: 'admin@9jobs.co',
        password: 'super-secret',
      }),
    });

    const response = await loginPost(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(response.headers.get('set-cookie')).toContain('9jobs_admin_session=');
  });

  test('rejects invalid login credentials', async () => {
    const { loginPost } = await loadAuthRoutes();
    authenticateAdminUser.mockResolvedValue(null);

    const request = new Request('http://localhost/api/admin/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': '10.0.0.2',
      },
      body: JSON.stringify({
        email: 'admin@9jobs.co',
        password: 'wrong-password',
      }),
    });

    const response = await loginPost(request);
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error).toBe('Invalid admin credentials.');
  });

  test('creates the initial admin account and logs them in', async () => {
    const { signupPost } = await loadAuthRoutes();
    createInitialAdminUser.mockResolvedValue({
      id: 'admin-1',
      email: 'owner@9jobs.co',
      name: 'Owner',
    });

    const request = new Request('http://localhost/api/admin/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Owner',
        email: 'owner@9jobs.co',
        password: 'super-secret',
        confirmPassword: 'super-secret',
      }),
    });

    const response = await signupPost(request);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.admin.email).toBe('owner@9jobs.co');
    expect(response.headers.get('set-cookie')).toContain('9jobs_admin_session=');
  });

  test('rejects signup when admin registration is closed', async () => {
    const { signupPost } = await loadAuthRoutes();
    createInitialAdminUser.mockRejectedValue(
      Object.assign(new Error('Admin registration is closed.'), {
        code: 'ADMIN_SIGNUP_DISABLED',
      })
    );

    const request = new Request('http://localhost/api/admin/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Owner',
        email: 'owner@9jobs.co',
        password: 'super-secret',
        confirmPassword: 'super-secret',
      }),
    });

    const response = await signupPost(request);
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.error).toBe('Admin registration is closed.');
  });

  test('accepts a forgot-password request with a generic success response', async () => {
    const { forgotPasswordPost } = await loadAuthRoutes();
    requestAdminPasswordReset.mockResolvedValue({
      success: true,
    });

    const request = new Request('http://localhost/api/admin/forgot-password', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: 'owner@9jobs.co',
      }),
    });

    const response = await forgotPasswordPost(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.message).toMatch(/reset link/i);
  });

  test('resets the password and logs the admin in', async () => {
    const { resetPasswordPost } = await loadAuthRoutes();
    resetAdminPassword.mockResolvedValue({
      id: 'admin-1',
      email: 'owner@9jobs.co',
      name: 'Owner',
    });

    const request = new Request('http://localhost/api/admin/reset-password', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        token: '12345678901234567890reset-token',
        password: 'fresh-secret',
        confirmPassword: 'fresh-secret',
      }),
    });

    const response = await resetPasswordPost(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(response.headers.get('set-cookie')).toContain('9jobs_admin_session=');
  });
});
