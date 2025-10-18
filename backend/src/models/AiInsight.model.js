import mongoose from 'mongoose';

const AiInsightSchema = new mongoose.Schema(
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
    abnormalValues: [{
      type: String,
    }],
    questionsToAsk: [{
      question: {
        type: String,
        required: true,
      },
    }],
    foodRecommendations: {
      avoid: [String],
      recommended: [String],
    },
    homeRemedies: [{
      remedy: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    }],
    disclaimer: {
      type: String,
      default: 'This AI analysis is for informational purposes only. Always consult your doctor before making any medical decisions. / Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi.',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('AiInsight', AiInsightSchema);
