import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import AdminLoginForm from '@/components/admin/AdminLoginForm';
import { hasRegisteredAdmins } from '@/lib/admin/auth/admin-user-service';
import { getAdminSessionFromCookieStore } from '@/lib/admin/auth/require-admin';

export const metadata = {
  title: 'Admin Login | 9Jobs',
};

export default async function AdminLoginPage({ searchParams }) {
  const session = await getAdminSessionFromCookieStore(await cookies());

  if (session) {
    redirect('/admin/dashboard');
  }

  let canSelfRegister = false;

  try {
    canSelfRegister = !(await hasRegisteredAdmins());
  } catch {
    canSelfRegister = false;
  }

  const resolvedSearchParams = await searchParams;
  const requestedNextPath =
    typeof resolvedSearchParams?.next === 'string' ? resolvedSearchParams.next : '/admin/dashboard';
  const nextPath = requestedNextPath.startsWith('/admin') ? requestedNextPath : '/admin/dashboard';

  return (
    <main className="admin-auth-shell">
      <div className="admin-auth-shell__panel">
        <p className="admin-auth-shell__label">9Jobs Agreement Console</p>
        <h1>Secure contract creation, preview, and DocuSign delivery.</h1>
        <p className="admin-auth-shell__text">
          Generate the 9 Jobs Service Contract, preview the PDF, send it for signatures, and track completion from one private admin space.
        </p>
      </div>
      <AdminLoginForm canSelfRegister={canSelfRegister} nextPath={nextPath} />
    </main>
  );
}
