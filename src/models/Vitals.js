import mongoose from 'mongoose';

const vitalsSchema = new mongoose.Schema(
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
      systolic: Number,
      diastolic: Number,
    },
    bloodSugar: Number,
    weight: Number,
    heartRate: Number,
    temperature: Number,
    notes: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Vitals || mongoose.model('Vitals', vitalsSchema);
