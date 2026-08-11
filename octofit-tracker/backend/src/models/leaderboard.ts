import mongoose, { Document, Schema } from 'mongoose';

export interface LeaderboardEntryDocument extends Document {
  userId: string;
  rank: number;
  score: number;
}

const LeaderboardEntrySchema = new Schema<LeaderboardEntryDocument>({
  userId: { type: String, required: true },
  rank: { type: Number, required: true },
  score: { type: Number, required: true }
});

const LeaderboardEntry = mongoose.model<LeaderboardEntryDocument>('LeaderboardEntry', LeaderboardEntrySchema);
export default LeaderboardEntry;
