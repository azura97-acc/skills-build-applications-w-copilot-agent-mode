import mongoose, { Document, Schema } from 'mongoose';

export interface LeaderboardEntryDocument extends Document {
  userId: string;
  name: string;
  rank: number;
  score: number;
  teamName?: string;
}

const LeaderboardEntrySchema = new Schema<LeaderboardEntryDocument>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
  teamName: { type: String, required: false }
});

const LeaderboardEntry = mongoose.model<LeaderboardEntryDocument>('LeaderboardEntry', LeaderboardEntrySchema);
export default LeaderboardEntry;
