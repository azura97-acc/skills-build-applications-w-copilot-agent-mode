import mongoose, { Document, Schema } from 'mongoose';

export interface ActivityDocument extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  activityDate: Date;
}

const ActivitySchema = new Schema<ActivityDocument>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  activityDate: { type: Date, required: true, default: () => new Date() }
});

const Activity = mongoose.model<ActivityDocument>('Activity', ActivitySchema);
export default Activity;
