import { Link, useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/Authstore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const SigninPage = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!result.status) {
        toast.error(result.message);
        return;
      }

      setUser(result.data);

      toast.success(result.message);
      navigate("/app");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center px-4 py-40 bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <form
        onSubmit={handleSignin}
        className="w-full max-w-md p-8 border rounded-xl bg-[rgb(var(--bg-secondary))] border-[rgb(var(--border))]"
      >
        <h2 className="mb-2 text-2xl font-semibold text-center text-[rgb(var(--primary))]">
          Sign In
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md bg-transparent border-[rgb(var(--border))]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-md bg-transparent border-[rgb(var(--border))]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-6 text-white rounded-md bg-[rgb(var(--primary))] disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="mt-6 text-sm text-center text-[rgb(var(--text-muted))]">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[rgb(var(--primary))]">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
};
