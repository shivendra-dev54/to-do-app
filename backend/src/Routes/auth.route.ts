import { logoutController } from "../Controllers/logout.auth.controller";
import { refreshTokenController } from "../Controllers/refresh.auth.controller";
import { signInController } from "../Controllers/signin.auth.controller";
import { signUpController } from "../Controllers/signup.auth.controller";

export const authRouter = {
  "/api/auth/signup": {
    "POST": signUpController
  },
  "/api/auth/signin": {
    "POST": signInController
  },
  "/api/auth/refresh": {
    "POST": refreshTokenController
  },
  "/api/auth/logout": {
    "POST": logoutController
  }
}