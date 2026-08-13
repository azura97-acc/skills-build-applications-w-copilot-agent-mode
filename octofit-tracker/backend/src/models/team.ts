import mongoose, { Document, Schema } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  description: string;
  members: number;
}

const TeamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: { type: Number, required: true, default: 0 }
});

const Team = mongoose.model<TeamDocument>('Team', TeamSchema);
export default Team;
