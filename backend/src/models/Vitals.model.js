import mongoose from 'mongoose';

const VitalsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model('Vitals', VitalsSchema);
