import express from 'express';
import database from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const port = Number(process.env.PORT || 8000);
const host = '0.0.0.0';
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    port,
    apiUrl,
    database: database.readyState
  });
});

database.once('open', () => {
  app.listen(port, host, () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
    console.log(`API URL: ${apiUrl}`);
  });
});

export default app;
