import mongoose from 'mongoose';

const aiInsightSchema = new mongoose.Schema(
  {
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    summaryEnglish: {
      type: String,
      required: true,
    },
    summaryUrdu: {
      type: String,
      required: true,
    },
    abnormalValues: [String],
    questionsToAsk: [
      {
        question: String,
      },
    ],
    foodRecommendations: {
      avoid: [String],
      recommended: [String],
    },
    homeRemedies: [
      {
        remedy: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AiInsight || mongoose.model('AiInsight', aiInsightSchema);
