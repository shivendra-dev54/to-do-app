import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { CreateTaskModal } from "../components/CreateTaskModal";
import { UpdateTaskModal } from "../components/UpdateTaskModal";
import { TaskCard } from "../components/TaskCard";

import { groupTasksByDate } from "../utils/groupTasksByDate";
import type { Task } from "../utils/Task.interface";

export const MainPage = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);


  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/task`, {
        credentials: "include",
      });

      const result = await res.json();

      if (!result.status) {
        throw new Error(result.message || "Failed to fetch tasks");
      }

      setTasks(result.data);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
      else {
        toast.error("Failed to load tasks.");
      }
    }
  }, [BACKEND_URL]);


  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);


  const updateTask = async (task: Task) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/task/${task.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          body: task.body,
          status: task.status,
        }),
      });

      const result = await res.json();

      if (!result.status) {
        throw new Error(result.message || "Update failed");
      }

      toast.success("Task updated");
      await fetchTasks();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
      else {
        toast.error("Failed to update task");
      }
    }
  };


  const toggleStatus = async (task: Task) => {
    await updateTask({
      ...task,
      status: task.status === "P" ? "C" : "P",
    });
  };


  const deleteTask = async (id: number) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/task/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();

      if (!result.status) {
        throw new Error(result.message || "Delete failed");
      }

      toast.success("Task deleted");
      await fetchTasks();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
      else {
        toast.error("Failed to delete task");
      }
    }
  };

  const groupedTasks = groupTasksByDate(tasks);

  return (
    <main className="p-6 min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-[rgb(var(--primary))]">
          Your Tasks
        </h1>

        <button
          onClick={() => setCreateOpen(true)}
          className="px-4 py-2 text-white rounded-md bg-[rgb(var(--primary))]"
        >
          New Task
        </button>
      </div>


      {Object.entries(groupedTasks).map(([date, tasks]) => {
        const pending = tasks.filter((t) => t.status === "P");
        const completed = tasks.filter((t) => t.status === "C");

        return (
          <section key={date} className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-[rgb(var(--text-muted))]">
              {date}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pending.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={toggleStatus}
                  onEdit={setEditTask}
                  onDelete={deleteTask}
                />
              ))}

              {completed.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={toggleStatus}
                  onEdit={setEditTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          </section>
        );
      })}


      {createOpen && (
        <CreateTaskModal
          onClose={() => setCreateOpen(false)}
          onCreated={fetchTasks}
        />
      )}


      {editTask && (
        <UpdateTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onUpdated={updateTask}
        />
      )}
    </main>
  );
};
