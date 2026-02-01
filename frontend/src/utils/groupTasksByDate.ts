import type { Task } from "./Task.interface";

export const groupTasksByDate = (tasks: Task[]) => {
  return tasks.reduce<Record<string, Task[]>>((acc, task) => {
    const date = new Date(task.created_at).toDateString();
    acc[date] = acc[date] || [];
    acc[date].push(task);
    return acc;
  }, {});
};
