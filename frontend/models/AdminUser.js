import mongoose from 'mongoose';

const AdminUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    passwordResetTokenHash: { type: String, default: '' },
    passwordResetExpiresAt: { type: Date, default: null },
    passwordResetRequestedAt: { type: Date, default: null },
    lastLoginAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);
