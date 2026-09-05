import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFilingInfo extends Document {
  userId: mongoose.Types.ObjectId;
  primaryFilingRequirement: string;
  entityType?: string;
  filingDetails?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FilingInfoSchema: Schema<IFilingInfo> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
    primaryFilingRequirement: { type: String, required: true, trim: true },
    entityType: { type: String, required: false, trim: true },
    filingDetails: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
    autoIndex: process.env.NODE_ENV !== 'production',
  }
);

// Indexes for query performance
// userId already indexed in schema

const FilingInfo: Model<IFilingInfo> =
  mongoose.models.FilingInfo || mongoose.model<IFilingInfo>('FilingInfo', FilingInfoSchema, 'filing_info');

export default FilingInfo;
