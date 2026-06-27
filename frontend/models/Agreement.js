import mongoose from 'mongoose';

const AgreementSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    clientEmail: { type: String, required: true, trim: true },
    clientPhone: { type: String, required: true, trim: true },
    providerName: { type: String, required: true, trim: true },
    providerEmail: { type: String, required: true, trim: true },
    providerPhone: { type: String, required: true, trim: true },
    providerSignatureName: { type: String, required: true, trim: true },
    agreementDate: { type: String, required: true, trim: true },
    packageName: { type: String, required: true, trim: true },
    servicePrice: { type: String, required: true, trim: true },
    weeklyJobTarget: { type: String, required: true, trim: true },
    initialTerm: { type: String, required: true, trim: true },
    notes: { type: String, default: '', trim: true },
    generatedPdfUrl: { type: String, default: '' },
    generatedPdfPath: { type: String, default: '' },
    signedPdfUrl: { type: String, default: '' },
    signedPdfPath: { type: String, default: '' },
    docuSignEnvelopeId: { type: String, default: '' },
    status: {
      type: String,
      enum: ['draft', 'previewed', 'sent', 'delivered', 'viewed', 'completed', 'declined', 'voided'],
      default: 'draft',
    },
    sentAt: { type: Date, default: null },
    signedAt: { type: Date, default: null },
    lastViewedAt: { type: Date, default: null },
    envelopeEvents: [
      {
        status: { type: String, required: true },
        receivedAt: { type: Date, default: Date.now },
        payload: { type: mongoose.Schema.Types.Mixed, default: {} },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Agreement || mongoose.model('Agreement', AgreementSchema);
