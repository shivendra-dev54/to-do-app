import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schemas/user.schema";
import { ApiResponse } from "../utils/ApiResponse";
import type { customRequest } from "../Interfaces/customRequests.interface";
import { getAccessToken } from "../utils/getAccessToken";
import { getRefreshToken } from "../utils/getRefreshToken";
import { asyncHandler } from "../Middleware/asyncHandler.middleware";
import { corsHeaders } from "../utils/cors";

export const refreshTokenController = asyncHandler(
  async (req: customRequest) => {
    const refresh_token = req.cookies.get("refresh_token");

    if (!refresh_token) {
      return Response.json(
        new ApiResponse(
          401,
          "unauthorized",
          false,
          {
            "token": null
          }
        ).toString(),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.refresh_token, refresh_token));

    if (!user[0]) {
      return Response.json(
        new ApiResponse(
          401,
          "invalid refresh token",
          false,
          {}
        ).toString(),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    const new_access_token = await getAccessToken(user[0]);
    const new_refresh_token = await getRefreshToken(user[0]);

    await db
      .update(users)
      .set({ refresh_token: new_refresh_token })
      .where(eq(users.id, user[0].id));

    req.cookies.set("access_token", new_access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    req.cookies.set("refresh_token", new_refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json(
      new ApiResponse(
        200,
        "token refreshed",
        true,
        {}
      ).toString(),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
);
