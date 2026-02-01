import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/Authstore";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/app", { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="border-b bg-[rgb(var(--bg-secondary))] border-[rgb(var(--border))]">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto text-[rgb(var(--text))]">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-[rgb(var(--primary))]"
        >
          TaskFlow
        </Link>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm border rounded-md border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))] transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white rounded-md bg-[rgb(var(--primary))] hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 text-sm border rounded-md border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))] transition"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 text-sm text-white rounded-md bg-[rgb(var(--primary))] hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-[rgb(var(--primary))]"
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 text-[rgb(var(--text))]">
          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 border rounded-md border-[rgb(var(--border))]"
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-white rounded-md bg-[rgb(var(--primary))]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 border rounded-md border-[rgb(var(--border))]"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-white rounded-md bg-[rgb(var(--primary))]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
