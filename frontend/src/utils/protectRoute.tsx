import { Navigate } from "react-router";
import { useAuthStore } from "../store/Authstore";
import type { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
