import Link from 'next/link';

import AdminShell from '@/components/admin/AdminShell';
import StatusBadge from '@/components/admin/StatusBadge';
import { requireAdminPageSession } from '@/lib/admin/auth/require-admin';
import { listAgreements } from '@/lib/agreements/service';

export const dynamic = 'force-dynamic';

export default async function AgreementsPage() {
  await requireAdminPageSession();
  const agreements = await listAgreements();

  return (
    <AdminShell eyebrow="Preview, send, and download agreements" title="Agreements">
      <section className="admin-panel">
        <div className="admin-panel__header">
          <div>
            <h2>Agreement Register</h2>
            <p>Track agreement status across generation, delivery, signing, and download.</p>
          </div>
          <Link className="admin-primary-button" href="/admin/agreements/new">
            Create Agreement
          </Link>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Provider Signatory</th>
                <th>Package</th>
                <th>Status</th>
                <th>Sent</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {agreements.map((agreement) => (
                <tr key={agreement._id}>
                  <td>
                    <strong>{agreement.clientName}</strong>
                    <span>{agreement.clientEmail}</span>
                  </td>
                  <td>{agreement.providerSignatureName}</td>
                  <td>{agreement.packageName}</td>
                  <td>
                    <StatusBadge status={agreement.status} />
                  </td>
                  <td>{agreement.sentAt ? agreement.sentAt.slice(0, 10) : 'Not sent'}</td>
                  <td>
                    <Link className="admin-link" href={`/admin/agreements/${agreement._id}`}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
