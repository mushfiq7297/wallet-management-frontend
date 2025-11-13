import { Navigate } from "react-router-dom";

interface WithAuthProps {
  component: React.ComponentType;
  role: string;
}

export function WithAuth({ component: Component, role }: WithAuthProps) {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/notFound" replace />;

  return <Component />;
}
