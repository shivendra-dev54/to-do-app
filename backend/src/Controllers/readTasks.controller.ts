import { eq } from "drizzle-orm";
import { authHandler } from "../Middleware/auth.middleware";
import { asyncHandler } from "../Middleware/asyncHandler.middleware";
import type { customRequest } from "../Interfaces/customRequests.interface";
import { db } from "../db";
import { tasks } from "../db/schemas/task.schema";
import { ApiResponse } from "../utils/ApiResponse";
import { corsHeaders } from "../utils/cors";

export const getTasksController = asyncHandler(
  authHandler(async (req: customRequest) => {
    const { id: userId } = req.user!;

    const userTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.user_id, userId));

    return Response.json(
      new ApiResponse(
        200,
        "Tasks fetched successfully",
        true,
        userTasks
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
