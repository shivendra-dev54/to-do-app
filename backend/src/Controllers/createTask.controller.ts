import type { createTaskBody } from "../Interfaces/createTask.interface";
import type { customRequest } from "../Interfaces/customRequests.interface";
import type { ITasksSchema } from "../Interfaces/tasksSchema.interface";
import { asyncHandler } from "../Middleware/asyncHandler.middleware";
import { ApiResponse } from "../utils/ApiResponse";
import { db } from "../db";
import { authHandler } from "../Middleware/auth.middleware";
import { tasks } from "../db/schemas/task.schema";
import { corsHeaders } from "../utils/cors";

export const createTaskController = asyncHandler(
  authHandler(async (req: customRequest) => {
    const { id: userId, username, email } = req.user!;

    const { title, body } = (await req.json()) as createTaskBody;

    if (!title || !body) {
      return Response.json(
        new ApiResponse(400, "Invalid title or body", false, null).toString(),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
      );
    }

    const newTask: ITasksSchema = {
      title,
      body,
      user_id: userId,
      status: "P",
      created_at: new Date(),
      updated_at: new Date()
    };

    await db.insert(tasks).values(newTask);

    return Response.json(
      new ApiResponse(
        201,
        "Task created successfully",
        true,
        { title, body, user: { id: userId, username, email } }
      ).toString(),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  })
);
