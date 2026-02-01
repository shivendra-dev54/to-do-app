import { ApiResponse } from "../utils/ApiResponse";
import { corsHeaders } from "../utils/cors";

export const healthCheckController = () => {
	return Response.json(
		new ApiResponse(
			200,
			"server working...",
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