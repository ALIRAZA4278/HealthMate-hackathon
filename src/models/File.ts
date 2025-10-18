import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IFile extends Document {
  userId: Types.ObjectId;
  fileName: string;
  fileType: 'lab_report' | 'prescription' | 'x-ray' | 'ultrasound' | 'other';
  fileUrl: string;
  uploadDate: Date;
  testDate: Date;
  cloudinaryPublicId: string;
  createdAt: Date;
  updatedAt: Date;
}

const FileSchema = new Schema<IFile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ['lab_report', 'prescription', 'x-ray', 'ultrasound', 'other'],
      default: 'other',
    },
    fileUrl: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    testDate: {
      type: Date,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.File || mongoose.model<IFile>('File', FileSchema);
