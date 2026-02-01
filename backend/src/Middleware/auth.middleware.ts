import * as jose from "jose";
import { ApiResponse } from "../utils/ApiResponse";
import type { AuthUser } from "../Interfaces/authUser.interface";
import type { customRequest } from "../Interfaces/customRequests.interface";
import { corsHeaders } from "../utils/cors";

export interface AuthenticatedRequest extends Request {
  user: AuthUser;
}

export const authHandler =
  <Req extends AuthenticatedRequest>(
    controller: (req: Req) => Promise<Response>
  ) =>
    async (req: customRequest): Promise<Response> => {
      try {
        const token = req.cookies.get("access_token");

        if (!token) {
          return Response.json(
            new ApiResponse(
              401,
              "Access token missing",
              false,
              null).toString(),
            {
              headers: {
                "Content-Type": "application/json",
                ...corsHeaders,
              },
            }
          );
        }

        const secret = new TextEncoder().encode(process.env.ACCESS_SECRET);
        const { payload } = await jose.jwtVerify(token, secret);

        req.user = {
          id: payload.id as number,
          username: payload.username as string,
          email: payload.email as string
        };

        return await controller(req as any);
      } catch (err) {
        console.log(err);
        return Response.json(
          new ApiResponse(
            401,
            "Invalid or expired access token",
            false,
            { error: err instanceof Error ? err.message : err }
          ).toString(),
          {
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }
    };
