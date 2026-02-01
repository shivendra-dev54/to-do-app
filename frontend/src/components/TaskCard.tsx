import type { Task } from "../utils/Task.interface";

interface TaskCardProps {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskCard = ({ task, onToggle, onEdit, onDelete }: TaskCardProps) => {
  const isCompleted = task.status === "C";

  return (
    <div
      className={`p-4 border rounded-xl bg-[rgb(var(--bg-secondary))] flex flex-col gap-2
        ${
          isCompleted
            ? "border-green-500/60"
            : "border-[rgb(var(--border))]"
        }
      `}
    >
      <h3 className="font-semibold">
        {task.title}
      </h3>

      <p className="text-sm text-[rgb(var(--text-muted))]">
        {task.body}
      </p>

      <div className="flex items-center justify-between mt-2">
        <button
          onClick={() => onToggle(task)}
          className={`text-sm ${
            isCompleted
              ? "text-green-400"
              : "text-[rgb(var(--primary))]"
          }`}
        >
          {isCompleted ? "Mark Pending" : "Mark Completed"}
        </button>

        <div className="flex gap-3 text-sm">
          <button
            onClick={() => onEdit(task)}
            className="hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="text-red-400 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
