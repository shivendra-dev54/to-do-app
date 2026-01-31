import { and, eq } from "drizzle-orm";
import type { createTaskBody } from "../Interfaces/createTask.interface";
import type { customRequest } from "../Interfaces/customRequests.interface";
import { asyncHandler } from "../Middleware/asyncHandler.middleware";
import { ApiResponse } from "../utils/ApiResponse";
import { db } from "../db";
import { getTaskIdFromUrl } from "../utils/getTaskIdFromUrl";
import { authHandler } from "../Middleware/auth.middleware";
import { tasks } from "../db/schemas/task.schema";

export const updateTaskController = asyncHandler(
  authHandler(async (req: customRequest) => {
    const taskId = getTaskIdFromUrl(req);
    if (!taskId) {
      return Response.json(
        new ApiResponse(400, "Invalid task id", false, null).toString()
      );
    }

    const { id: userId } = req.user!;
    const { title, body } = (await req.json()) as Partial<createTaskBody>;

    if (!title && !body) {
      return Response.json(
        new ApiResponse(400, "Nothing to update", false, null).toString()
      );
    }

    const task = await db
      .select()
      .from(tasks)
      .where(
        and(
          eq(tasks.id, taskId),
          eq(tasks.user_id, userId)
        )
      )
      .limit(1);

    if (task.length === 0) {
      return Response.json(
        new ApiResponse(
          404,
          "Task not found or not authorized",
          false,
          null
        ).toString()
      );
    }

    await db
      .update(tasks)
      .set({
        ...(title && { title }),
        ...(body && { body }),
        updated_at: new Date()
      })
      .where(eq(tasks.id, taskId));

    return Response.json(
      new ApiResponse(
        200,
        "Task updated successfully",
        true,
        null
      ).toString()
    );
  })
);
