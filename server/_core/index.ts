import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Redirect www to non-www (canonical domain)
  app.use((req, res, next) => {
    const host = req.headers.host || "";
    if (host.startsWith("www.")) {
      const newHost = host.slice(4);
      return res.redirect(301, `https://${newHost}${req.originalUrl}`);
    }
    next();
  });
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // PDF proxy route - bypasses CORS on CloudFront, forces file download
  app.get('/api/pdf-proxy', async (req, res) => {
    const url = req.query.url as string;
    const filename = (req.query.filename as string) || 'daily-good-news.pdf';
    if (!url || !url.startsWith('https://')) {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    try {
      const https = await import('https');
      const http = await import('http');
      const client = url.startsWith('https://') ? https : http;
      const proxyReq = (client as any).get(url, (proxyRes: any) => {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        if (proxyRes.headers['content-length']) {
          res.setHeader('Content-Length', proxyRes.headers['content-length']);
        }
        proxyRes.pipe(res);
      });
      proxyReq.on('error', () => res.status(500).json({ error: 'Failed to fetch PDF' }));
    } catch {
      res.status(500).json({ error: 'Proxy error' });
    }
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  // Increase timeout to 5 minutes for long-running LLM generation requests
  server.timeout = 300000;
  server.keepAliveTimeout = 305000;
  server.headersTimeout = 310000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
