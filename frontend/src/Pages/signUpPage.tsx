import { Link, useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      toast.success("Account created successfully");
      navigate("/signin");
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md p-8 sm:p-10 border rounded-xl bg-[rgb(var(--bg-secondary))] border-[rgb(var(--border))]"
      >
        <h2 className="mb-2 text-2xl sm:text-3xl font-semibold text-center text-[rgb(var(--primary))]">
          Create Account
        </h2>

        <p className="mb-8 text-sm text-center text-[rgb(var(--text-muted))]">
          Get started with TaskFlow
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-6 text-white rounded-md bg-[rgb(var(--primary))] disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="mt-6 text-sm text-center text-[rgb(var(--text-muted))]">
          Already have an account?{" "}
          <Link to="/signin" className="text-[rgb(var(--primary))]">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
};
