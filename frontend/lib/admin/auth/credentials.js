import bcrypt from 'bcryptjs';

export async function verifyAdminCredentials({ email, password }) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    throw new Error('Admin credentials are not configured.');
  }

  const emailMatches = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();

  if (!emailMatches) {
    return false;
  }

  return bcrypt.compare(password, adminPasswordHash);
}
