import { createTaskController } from "../Controllers/createTask.controller";
import { deleteTaskController } from "../Controllers/deleteTask.controller";
import { getTasksController } from "../Controllers/readTasks.controller";
import { updateTaskController } from "../Controllers/updateTask.controller";

export const taskRouter = {
  "/api/task": {
    "POST": createTaskController,
    "GET": getTasksController
  },
  "/api/task/:id": {
    "PUT": updateTaskController,
    "DELETE": deleteTaskController
  }
}