import { logoutController } from "../Controllers/logout.auth.controller";
import { refreshTokenController } from "../Controllers/refresh.auth.controller";
import { signInController } from "../Controllers/signin.auth.controller";
import { signUpController } from "../Controllers/signup.auth.controller";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":
    process.env.ALLOWED_ORIGIN ?? "http://localhost:5173",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

export const authRouter = {
  "/api/auth/signup": {
    OPTIONS: () => new Response(null, { status: 204, headers: CORS_HEADERS }),
    POST: signUpController,
  },

  "/api/auth/signin": {
    OPTIONS: () => new Response(null, { status: 204, headers: CORS_HEADERS }),
    POST: signInController,
  },

  "/api/auth/refresh": {
    OPTIONS: () => new Response(null, { status: 204, headers: CORS_HEADERS }),
    POST: refreshTokenController,
  },

  "/api/auth/logout": {
    OPTIONS: () => new Response(null, { status: 204, headers: CORS_HEADERS }),
    POST: logoutController,
  },
};
