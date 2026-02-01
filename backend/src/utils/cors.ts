
export const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN ?? "http://localhost:5173",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};