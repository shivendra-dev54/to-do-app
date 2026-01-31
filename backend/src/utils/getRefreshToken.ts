import * as jose from "jose";
import type { userFromDB } from "../Interfaces/userFromDB.interface";

export const getRefreshToken = async (user: userFromDB) => {
  const refresh_secret = new TextEncoder().encode(process.env.REFRESH_SECRET);
  const refresh_token = await new jose.SignJWT({
    id: user.id,
    username: user.username,
    email: user.email
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(refresh_secret);
  return refresh_token;
}

