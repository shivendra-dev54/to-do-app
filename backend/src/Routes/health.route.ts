import { healthCheckController } from "../Controllers/healthCheck.controller";


export const healthRouter = {
	"/api/health-check": {
		"GET": healthCheckController
	}
}