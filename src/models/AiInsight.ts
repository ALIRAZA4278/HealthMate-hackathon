import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IQuestionToAsk {
  question: string;
}

export interface IFoodRecommendation {
  avoid: string[];
  recommended: string[];
}

export interface IHomeRemedy {
  remedy: string;
  description: string;
}

export interface IAiInsight extends Document {
  fileId: Types.ObjectId;
  userId: Types.ObjectId;
  summaryEnglish: string;
  summaryUrdu: string;
  abnormalValues: string[];
  questionsToAsk: IQuestionToAsk[];
  foodRecommendations: IFoodRecommendation;
  homeRemedies: IHomeRemedy[];
  disclaimer: string;
  createdAt: Date;
  updatedAt: Date;
}

const AiInsightSchema = new Schema<IAiInsight>(
  {
    fileId: {
      type: Schema.Types.ObjectId,
      ref: 'File',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
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

export default mongoose.models.AiInsight || mongoose.model<IAiInsight>('AiInsight', AiInsightSchema);
