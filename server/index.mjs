import express, { json } from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import studentRoutes from './routers/studentRoutes.mjs';
import resultRoutes from './routers/resultRoutes.mjs';
import examRoutes from './routers/examRoutes.mjs';
import subjectRoutes from './routers/subjectRoutes.mjs';
import './models/associations.mjs';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(json());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

app.use(express.static(distPath));

// API routes - with prefix '/api'
app.use('/api/students', studentRoutes);
app.use('/api/result', resultRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api', (_req, res) => {
  res.status(200).json({ message: 'Welcome' });
});

// Route handler for SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
