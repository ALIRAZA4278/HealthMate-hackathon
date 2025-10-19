import mongoose from 'mongoose';

const FamilyMemberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#ec4899',
    },
    customId: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('FamilyMember', FamilyMemberSchema);
