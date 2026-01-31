import { authRouter } from "./src/Routes/auth.route";
import { healthRouter } from "./src/Routes/health.route";
import { taskRouter } from "./src/Routes/tasks.route";
import { ApiResponse } from "./src/utils/ApiResponse";
import { mergeRoutes } from "./src/utils/routerMerger";
import "dotenv/config";

const server = Bun.serve({
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
				{
					"request": req
				}
			)
		);
	},
});

console.log(`Server running at ${server.url}`);