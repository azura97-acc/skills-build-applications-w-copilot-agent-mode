import express from 'express';
import mongoose from 'mongoose';
import database from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', port, database: mongoose.connection.readyState });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
});

export default app;
