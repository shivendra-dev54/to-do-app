import { authRouter } from "./src/Routes/auth.route";
import { healthRouter } from "./src/Routes/health.route";
import { taskRouter } from "./src/Routes/tasks.route";
import { ApiResponse } from "./src/utils/ApiResponse";
import { mergeRoutes } from "./src/utils/routerMerger";

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? "http://localhost:5173";

const server = Bun.serve({
  port: process.env.PORT,

  routes: mergeRoutes(
    healthRouter,
    authRouter,
    taskRouter
  ),

  fetch(req) {
    
    return Response.json(
      new ApiResponse(
        404,
        "route not found!",
        false,
        {}
      ),
      {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
  },
});

console.log(`Server running at ${server.url}`);
