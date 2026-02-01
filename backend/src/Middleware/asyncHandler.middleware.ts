import { ApiResponse } from "../utils/ApiResponse";
import { corsHeaders } from "../utils/cors";

export const asyncHandler =
  <Req extends Request>(
    controller: (req: Req) => Promise<Response>
  ) =>
    async (req: Req): Promise<Response> => {
      try {
        return await controller(req);
      } catch (err) {
        return Response.json(
          new ApiResponse(
            500,
            "Something went wrong",
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
