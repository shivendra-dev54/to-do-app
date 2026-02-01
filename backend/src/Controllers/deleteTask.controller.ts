import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { tasks } from "../db/schemas/task.schema";
import { ApiResponse } from "../utils/ApiResponse";
import { getTaskIdFromUrl } from "../utils/getTaskIdFromUrl";
import type { customRequest } from "../Interfaces/customRequests.interface";
import { asyncHandler } from "../Middleware/asyncHandler.middleware";
import { authHandler } from "../Middleware/auth.middleware";
import { corsHeaders } from "../utils/cors";

export const deleteTaskController = asyncHandler(
  authHandler(async (req: customRequest) => {
    const taskId = getTaskIdFromUrl(req);
    if (!taskId) {
      return Response.json(
        new ApiResponse(400, "Invalid task id", false, null).toString(),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    const { id: userId } = req.user!;

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
        ).toString(),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    await db
      .delete(tasks)
      .where(eq(tasks.id, taskId));

    return Response.json(
      new ApiResponse(
        200,
        "Task deleted successfully",
        true,
        null
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
