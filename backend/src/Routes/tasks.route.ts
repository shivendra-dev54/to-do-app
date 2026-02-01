import { createTaskController } from "../Controllers/createTask.controller";
import { deleteTaskController } from "../Controllers/deleteTask.controller";
import { getTasksController } from "../Controllers/readTasks.controller";
import { updateTaskController } from "../Controllers/updateTask.controller";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":
    process.env.ALLOWED_ORIGIN ?? "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

export const taskRouter = {
  "/api/task": {
    OPTIONS: () => new Response(null, { status: 204, headers: CORS_HEADERS }),
    GET: getTasksController,
    POST: createTaskController,
  },

  "/api/task/:id": {
    OPTIONS: () => new Response(null, { status: 204, headers: CORS_HEADERS }),
    PUT: updateTaskController,
    DELETE: deleteTaskController,
  },
};
