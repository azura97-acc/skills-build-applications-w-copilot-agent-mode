import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Initialize MongoDB connection via Mongoose
 *
 * Environment Configuration:
 * - MONGODB_URI: Optional MongoDB connection string
 * - Default: mongodb://localhost:27017/octofit_db
 *
 * Connection ready: Listen for 'open' event on the connection
 */
async function connectDatabase(): Promise<typeof mongoose> {
  try {
    await mongoose.connect(connectionString);
    console.log('✓ Connected to octofit_db');
    return mongoose;
  } catch (error) {
    console.error('✗ Error connecting to octofit_db:', error);
    process.exit(1);
  }
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('disconnected', () => console.log('MongoDB disconnected'));

// Initialize connection
connectDatabase();

export default db;
