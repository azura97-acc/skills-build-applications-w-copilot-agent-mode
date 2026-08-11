import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboard';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.create([
      { name: 'Avery Octo', email: 'avery@octofit.com', role: 'Member', teamId: 'team-1' },
      { name: 'Kai Track', email: 'kai@octofit.com', role: 'Coach', teamId: 'team-2' },
      { name: 'Riley Wave', email: 'riley@octofit.com', role: 'Member', teamId: 'team-2' }
    ]);

    const teams = await Team.create([
      { name: 'Team Coral', description: 'High-energy fitness crew focused on endurance.', members: 8 },
      { name: 'Team Wave', description: 'Strength and recovery-focused workout squad.', members: 12 }
    ]);

    const workouts = await Workout.create([
      {
        title: 'Full Body Blast',
        durationMinutes: 50,
        difficulty: 'Intermediate',
        exercises: ['Jump Squats', 'Push-ups', 'Plank Hold', 'Burpees']
      },
      {
        title: 'Core Stability',
        durationMinutes: 30,
        difficulty: 'Beginner',
        exercises: ['Russian Twists', 'Dead Bug', 'Mountain Climbers', 'Leg Raises']
      }
    ]);

    const activities = await Activity.create([
      {
        userId: String(users[0]._id),
        type: 'Morning Run',
        durationMinutes: 35,
        caloriesBurned: 320,
        activityDate: new Date(Date.now() - 1000 * 60 * 60 * 24)
      },
      {
        userId: String(users[1]._id),
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 480,
        activityDate: new Date(Date.now() - 1000 * 60 * 60 * 48)
      },
      {
        userId: String(users[2]._id),
        type: 'Yoga Flow',
        durationMinutes: 45,
        caloriesBurned: 190,
        activityDate: new Date(Date.now() - 1000 * 60 * 60 * 72)
      }
    ]);

    const leaderboard = await LeaderboardEntry.create([
      { userId: String(users[0]._id), rank: 1, score: 1420 },
      { userId: String(users[1]._id), rank: 2, score: 1345 },
      { userId: String(users[2]._id), rank: 3, score: 1280 }
    ]);

    console.log('Inserted:', {
      users: users.length,
      teams: teams.length,
      workouts: workouts.length,
      activities: activities.length,
      leaderboard: leaderboard.length
    });

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
