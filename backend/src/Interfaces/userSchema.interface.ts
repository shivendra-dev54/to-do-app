export interface IUserSchema {
  id?: number;
  username: string;
  email: string;
  password: string;
  refresh_token?: string;
  created_at?: Date;
  updated_at?: Date;
};