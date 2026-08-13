import mongoose, { Document, Schema } from 'mongoose';

export interface WorkoutDocument extends Document {
  title: string;
  durationMinutes: number;
  difficulty: string;
  exercises: string[];
}

const WorkoutSchema = new Schema<WorkoutDocument>({
  title: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  exercises: { type: [String], required: true }
});

const Workout = mongoose.model<WorkoutDocument>('Workout', WorkoutSchema);
export default Workout;
