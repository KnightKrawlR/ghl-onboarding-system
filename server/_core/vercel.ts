import "dotenv/config";
import express, { Request, Response } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configure body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// OAuth callback
registerOAuthRoutes(app);

// tRPC API
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Serve static files from dist/public in production
const staticPath = path.resolve(__dirname, "..", "..", "dist", "public");
app.use(express.static(staticPath));

// Handle client-side routing - serve index.html for all non-API routes
app.get("*", (_req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

export default app;
