export interface userFromDB {
  id: number;
  username: string;
  email: string;
  password: string;
  refresh_token: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}