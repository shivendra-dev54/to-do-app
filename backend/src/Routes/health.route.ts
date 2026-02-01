import { healthCheckController } from "../Controllers/healthCheck.controller";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":
    process.env.ALLOWED_ORIGIN ?? "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const healthRouter = {
  "/api/health-check": {
    OPTIONS: () => new Response(null, { status: 204, headers: CORS_HEADERS }),
    GET: healthCheckController,
  },
};
