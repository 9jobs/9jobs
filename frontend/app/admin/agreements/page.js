import Link from 'next/link';

import AdminShell from '@/components/admin/AdminShell';
import AgreementRegisterActions from '@/components/admin/AgreementRegisterActions';
import StatusBadge from '@/components/admin/StatusBadge';
import { requireAdminPageSession } from '@/lib/admin/auth/require-admin';
import { listAgreements, syncPendingAgreementStatuses } from '@/lib/agreements/service';

export const dynamic = 'force-dynamic';

export default async function AgreementsPage() {
  await requireAdminPageSession();
  await syncPendingAgreementStatuses();
  const agreements = await listAgreements();

  return (
    <AdminShell eyebrow="Preview, send, and download agreements" title="Agreements">
      <section className="admin-panel">
        <div className="admin-panel__header">
          <div>
            <h2>Agreement Register</h2>
            <p>Track agreement status across generation, delivery, signing, and download.</p>
          </div>
          <AgreementRegisterActions hasAgreements={agreements.length > 0} />
        </div>

        {agreements.length ? (
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
        ) : (
          <div className="admin-empty-state">
            <p>No agreements are stored right now. Start fresh and create a new agreement to generate the live PDF preview.</p>
          </div>
        )}
      </section>
    </AdminShell>
  );
}
