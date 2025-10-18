import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IVitals extends Document {
  userId: Types.ObjectId;
  date: Date;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  bloodSugar?: number;
  weight?: number;
  heartRate?: number;
  temperature?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VitalsSchema = new Schema<IVitals>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    bloodPressure: {
      systolic: {
        type: Number,
      },
      diastolic: {
        type: Number,
      },
    },
    bloodSugar: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    heartRate: {
      type: Number,
    },
    temperature: {
      type: Number,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying by user and date
VitalsSchema.index({ userId: 1, date: -1 });

export default mongoose.models.Vitals || mongoose.model<IVitals>('Vitals', VitalsSchema);
