import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schemas/user.schema";
import { ApiResponse } from "../utils/ApiResponse";
import type { customRequest } from "../Interfaces/customRequests.interface";
import { asyncHandler } from "../Middleware/asyncHandler.middleware";

export const logoutController = asyncHandler(
  async (req: customRequest) => {
    const refresh_token = req.cookies.get("refresh_token")?.value;

    if (refresh_token) {
      await db
        .update(users)
        .set({ refresh_token: null })
        .where(eq(users.refresh_token, refresh_token));
    }

    req.cookies.set("access_token", "", {
      path: "/",
      maxAge: 0,
    });

    req.cookies.set("refresh_token", "", {
      path: "/",
      maxAge: 0,
    });

    return Response.json(
      new ApiResponse(
        200,
        "logged out successfully",
        true,
        {}
      )
    );
  }
);
