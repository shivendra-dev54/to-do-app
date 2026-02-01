import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schemas/user.schema";
import type { signInBody } from "../Interfaces/signInBody.interface";
import { ApiResponse } from "../utils/ApiResponse";
import { comparePasswords } from "../utils/comparePasswords";
import type { customRequest } from "../Interfaces/customRequests.interface";
import { getAccessToken } from "../utils/getAccessToken";
import { getRefreshToken } from "../utils/getRefreshToken";
import { asyncHandler } from "../Middleware/asyncHandler.middleware";
import { corsHeaders } from "../utils/cors";

export const signInController = asyncHandler(
  async (req: customRequest) => {
    const body: signInBody = await req.json() as signInBody;

    const {
      email,
      password
    } = body;

    if (!email || !password) {
      return Response.json(
        new ApiResponse(
          400,
          "invalid email or password",
          false,
          body
        ).toString(),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    const userToBeLoggedIn = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!userToBeLoggedIn[0]) {
      return Response.json(
        new ApiResponse(
          404,
          "invalid email or password",
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

    const isPasswordCorrect = await comparePasswords(password, userToBeLoggedIn[0].password);

    if (!isPasswordCorrect) {
      return Response.json(
        new ApiResponse(
          400,
          "password does not match.",
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

    const cookies = req.cookies;

    const access_token = await getAccessToken(userToBeLoggedIn[0]);
    const refresh_token = await getRefreshToken(userToBeLoggedIn[0]);

    cookies.set("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    cookies.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });


    userToBeLoggedIn[0].refresh_token = refresh_token;
    const updatedUser = await db
      .update(users)
      .set({
        refresh_token: refresh_token
      })
      .where(eq(users.email, email));


    return Response.json(
      new ApiResponse(
        200,
        "logged in successfully.",
        true,
        {
          "username": userToBeLoggedIn[0].username,
          "email": userToBeLoggedIn[0].email
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
);