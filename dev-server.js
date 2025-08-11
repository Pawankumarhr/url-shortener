import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Import API handlers
const shortenHandler = await import('./api/shorten.js');
const redirectHandler = await import('./api/[shortCode].js');

// API routes
app.post('/api/shorten', (req, res) => {
  shortenHandler.default(req, res);
});

app.get('/api/:shortCode', (req, res) => {
  req.query = { shortCode: req.params.shortCode };
  redirectHandler.default(req, res);
});

// Handle direct short URL redirects
app.get('/:shortCode', (req, res) => {
  req.query = { shortCode: req.params.shortCode };
  redirectHandler.default(req, res);
});

app.listen(PORT, () => {
  console.log(`Development API server running on http://localhost:${PORT}`);
  console.log('MongoDB URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
});
