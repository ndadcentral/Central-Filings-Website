import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email?: string;
  phone: string;
  companyName: string;
  city?: string;
  countryCode: string;
  timezone: string;
  status: 'ACTIVE' | 'DELETED' | 'ONHOLD';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, sparse: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, required: true, unique: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    city: { type: String, required: false, trim: true },
    countryCode: { type: String, default: '+91', trim: true },
    timezone: { type: String, default: 'Asia/Kolkata', trim: true },
    status: { type: String, enum: ['ACTIVE', 'DELETED', 'ONHOLD'], default: 'ACTIVE' },
  },
  {
    timestamps: true,
    autoIndex: process.env.NODE_ENV !== 'production',
  }
);

// Indexes for query performance
UserSchema.index({ createdAt: -1 });

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema, 'users');

export default User;
