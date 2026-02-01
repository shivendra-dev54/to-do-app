export interface Task {
  id: number;
  title: string;
  body: string;
  status: "P" | "C";
  created_at: string;
  updated_at: string;
}