import AdminShell from '@/components/admin/AdminShell';
import AgreementForm from '@/components/admin/AgreementForm';
import { requireAdminPageSession } from '@/lib/admin/auth/require-admin';

export const dynamic = 'force-dynamic';

export default async function NewAgreementPage() {
  await requireAdminPageSession();

  return (
    <AdminShell eyebrow="Create an agreement draft" title="New Agreement">
      <AgreementForm />
    </AdminShell>
  );
}
