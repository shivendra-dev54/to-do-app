import toast from "react-hot-toast";
import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface ICreateTaskModel {
  onClose: () => void;
  onCreated: () => Promise<void>
}

export const CreateTaskModal = ({ onClose, onCreated }: ICreateTaskModel) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreate = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/task`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });

      const result = await res.json();
      if (!result.status) throw new Error(result.message);

      onCreated();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
      else {
        toast.error("Failed to create task");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[rgb(var(--bg))] p-6 rounded-xl">
        <h2 className="mb-4 text-xl font-semibold">New Task</h2>

        <input
          placeholder="Title"
          className="w-full mb-3 input"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          className="w-full mb-4 input"
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-[rgb(var(--primary))] text-white rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
