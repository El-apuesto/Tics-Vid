import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import ordersRouter from './routes/orders.js';
import webhooksRouter from './routes/webhooks.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Stripe webhook route needs raw body — register before json middleware
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

app.use(express.json());
app.use(cors({
  origin: [FRONTEND_URL, /\.onrender\.com$/, /\.vercel\.app$/, /\.netlify\.app$/],
  methods: ['GET', 'POST', 'OPTIONS'],
}));

// Routes
app.use('/api/orders', ordersRouter);
app.use('/api/webhooks', webhooksRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    merchizeConfigured: Boolean(
      process.env.MERCHIZE_API_BASE_URL && process.env.MERCHIZE_ACCESS_TOKEN
    ),
    stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
  });
});

// In production, serve the Vite build from ../dist
if (process.env.NODE_ENV === 'production') {
  const distPath = join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`\n🚀 Tourettes Inc. API server running on http://localhost:${PORT}`);
  console.log(`   Merchize configured: ${Boolean(process.env.MERCHIZE_API_BASE_URL && process.env.MERCHIZE_ACCESS_TOKEN)}`);
  console.log(`   Stripe configured:   ${Boolean(process.env.STRIPE_SECRET_KEY)}\n`);
});
