import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  role: string;
  teamName?: string;
  joinedAt: Date;
  teamId?: string;
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  teamName: { type: String, required: false },
  joinedAt: { type: Date, required: true, default: () => new Date() },
  teamId: { type: String }
});

const User = mongoose.model<UserDocument>('User', UserSchema);
export default User;
