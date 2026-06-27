const STATUS_LABELS = {
  draft: 'Draft',
  previewed: 'Previewed',
  sent: 'Sent',
  delivered: 'Delivered',
  viewed: 'Viewed',
  completed: 'Completed',
  declined: 'Declined',
  voided: 'Voided',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`admin-status-badge admin-status-badge--${status || 'draft'}`}>
      {STATUS_LABELS[status] || status || 'Draft'}
    </span>
  );
}
