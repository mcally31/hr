import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import leaveRouter from './routes/leave';
import directoryRouter from './routes/directory';

const app = express();

app.use(cors({ origin: '*'}));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'NexusHR API' });
});

app.use('/api/auth', authRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/directory', directoryRouter);

export default app;