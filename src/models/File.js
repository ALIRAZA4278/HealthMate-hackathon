import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
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
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
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

export default mongoose.models.File || mongoose.model('File', fileSchema);
