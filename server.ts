import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

const CLASSIFICATION_API_URL =
  process.env.CLASSIFICATION_API_URL || 'https://cropguard-ai-api.onrender.com';
const YIELD_API_URL =
  process.env.YIELD_API_URL || 'https://cropguard-ai-vurl.onrender.com';

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    time: new Date().toISOString(),
    classificationBackend: CLASSIFICATION_API_URL,
    yieldBackend: YIELD_API_URL
  });
});

// Proxy: Classification Health
app.get('/api/classify/health', async (_req: Request, res: Response) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const remote = await fetch(`${CLASSIFICATION_API_URL}/health`, {
      signal: controller.signal
    });
    clearTimeout(timeout);
    const data = await remote.json().catch(() => ({ status: 'unknown' }));
    res.status(remote.status).json(data);
  } catch (err: any) {
    res.status(503).json({
      status: 'offline',
      message: err.name === 'AbortError' ? 'Timeout reaching classification backend' : err.message
    });
  }
});

// Proxy: Classification Predict
app.post('/api/classify/predict', async (req: Request, res: Response) => {
  try {
    const controller = new AbortController();
    // Allow up to 30 seconds for Render free tier spin-up
    const timeout = setTimeout(() => controller.abort(), 30000);

    const remoteRes = await fetch(`${CLASSIFICATION_API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(req.body),
      signal: controller.signal
    });
    clearTimeout(timeout);

    const data = await remoteRes.json().catch(() => null);
    if (!data) {
      return res.status(remoteRes.status).json({
        status: 'error',
        message: `Remote server responded with ${remoteRes.statusText}`
      });
    }

    res.status(remoteRes.status).json(data);
  } catch (err: any) {
    console.error('Error proxying to classification backend:', err);
    res.status(502).json({
      status: 'error',
      message:
        err.name === 'AbortError'
          ? 'Classification backend timed out (Render container cold start). Please retry.'
          : err.message || 'Failed to connect to classification service'
    });
  }
});

// Proxy: Yield Health
app.get('/api/yield/health', async (_req: Request, res: Response) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const remote = await fetch(`${YIELD_API_URL}/health`, {
      signal: controller.signal
    });
    clearTimeout(timeout);
    const data = await remote.json().catch(() => ({ status: 'unknown' }));
    res.status(remote.status).json(data);
  } catch (err: any) {
    res.status(503).json({
      status: 'offline',
      message: err.name === 'AbortError' ? 'Timeout reaching yield backend' : err.message
    });
  }
});

// Proxy: Yield Predict
app.post('/api/yield/predict', async (req: Request, res: Response) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const remoteRes = await fetch(`${YIELD_API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(req.body),
      signal: controller.signal
    });
    clearTimeout(timeout);

    const data = await remoteRes.json().catch(() => null);
    if (!data) {
      return res.status(remoteRes.status).json({
        status: 'error',
        message: `Remote server responded with ${remoteRes.statusText}`
      });
    }

    res.status(remoteRes.status).json(data);
  } catch (err: any) {
    console.error('Error proxying to yield backend:', err);
    res.status(502).json({
      status: 'error',
      message:
        err.name === 'AbortError'
          ? 'Yield prediction backend timed out (Render container cold start). Please retry.'
          : err.message || 'Failed to connect to yield prediction service'
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CropGuard server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
