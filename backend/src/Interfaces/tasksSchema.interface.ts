export interface ITasksSchema{
  id?: number;
  title: string;
  body: string;
  user_id: number;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}