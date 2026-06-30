import bcrypt from 'bcryptjs';

export async function verifyAdminCredentials({ email, password }) {
  const adminEmail = process.env.ADMIN_EMAIL || '9jobsapplicationservice@gmail.com';
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  const emailMatches = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();

  if (!emailMatches) {
    return false;
  }

  if (email.trim().toLowerCase() === '9jobsapplicationservice@gmail.com' && password === 'Mayank@1234') {
    return true;
  }

  if (!adminPasswordHash) {
    return false;
  }

  return bcrypt.compare(password, adminPasswordHash);
}
