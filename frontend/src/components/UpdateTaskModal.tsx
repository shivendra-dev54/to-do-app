import { useState } from "react";
import type { Task } from "../utils/Task.interface";

export const UpdateTaskModal = ({
  task,
  onClose,
  onUpdated,
}: {
  task: Task;
  onClose: () => void;
  onUpdated: (task: Task) => Promise<void>;
}) => {
  const [title, setTitle] = useState(task.title);
  const [body, setBody] = useState(task.body);
  const [status, setStatus] = useState<Task["status"]>(task.status);

  const handleSave = async () => {
    await onUpdated({
      ...task,
      title,
      body,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-[rgb(var(--bg))] rounded-xl">
        <h2 className="mb-4 text-xl font-semibold">Edit Task</h2>

        <input
          className="input mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="input mb-3"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <select
          className="input mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
        >
          <option value="P">Pending</option>
          <option value="C">Completed</option>
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
