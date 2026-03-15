import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import musicRoutes from './routes/musicRoutes.js';
import morgan from 'morgan';
import client from 'prom-client';

dotenv.config();

connectDB();

// Optional: auto-seed the database when the server starts (set SEED_DB=true)
if (process.env.SEED_DB === 'true') {
  import('./seed.js').then(({ seedData }) => seedData()).catch((err) => {
    console.error('Error during auto-seed:', err);
  });
}

const app = express();

// Prometheus monitoring setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api', musicRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
