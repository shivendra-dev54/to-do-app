import { ApiResponse } from "../utils/ApiResponse";

export const healthCheckController = () => {
	return Response.json(
		new ApiResponse(
			200,
			"server working...",
			true,
			{}
		).toString()
	);
}