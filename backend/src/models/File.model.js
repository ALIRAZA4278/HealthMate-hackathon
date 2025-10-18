import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ['lab_report', 'CBC', 'prescription', 'x-ray', 'ultrasound', 'MRI', 'CT_Scan', 'other'],
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
    labHospital: {
      type: String,
      default: '',
    },
    doctor: {
      type: String,
      default: '',
    },
    price: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
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

export default mongoose.model('File', FileSchema);
