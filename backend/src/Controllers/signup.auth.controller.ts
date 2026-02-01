import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schemas/user.schema";
import type { signUpBody } from "../Interfaces/signUpBody.interface";
import { ApiResponse } from "../utils/ApiResponse";
import type { IUserSchema } from "../Interfaces/userSchema.interface";
import { hashPassword } from "../utils/hashPassword";
import { asyncHandler } from "../Middleware/asyncHandler.middleware";
import { corsHeaders } from "../utils/cors";


export const signUpController = asyncHandler(
  async (req: Request) => {
    const body: signUpBody = await req.json() as signUpBody;

    const {
      username,
      email,
      password
    } = body;

    if (!username || !email || !password) {
      return Response.json(
        new ApiResponse(
          400,
          "All fields are mandatory.",
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

    // same email users
    const usersWithSameEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (usersWithSameEmail.length > 0) {
      return Response.json(
        new ApiResponse(
          400,
          "account with this email already exists.",
          false,
          {
            "username": usersWithSameEmail[0]?.username,
            "email": usersWithSameEmail[0]?.email
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

    // same username users
    const usersWithSameUsername = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (usersWithSameUsername.length > 0) {
      return Response.json(
        new ApiResponse(
          400,
          "account with this username already exists.",
          false,
          {
            "username": usersWithSameUsername[0]?.username,
            "email": usersWithSameUsername[0]?.email
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

    const hashedPass = await hashPassword(password);

    const user: IUserSchema = {
      username,
      email,
      password: hashedPass,
      refresh_token: undefined,
      created_at: new Date(),
      updated_at: new Date()
    }

    await db
      .insert(users)
      .values(user);

    return Response.json(
      new ApiResponse(
        201,
        "registered new user successfully.",
        true,
        {
          "username": username,
          "email": email
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