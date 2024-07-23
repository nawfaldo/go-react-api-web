import { createFileRoute, Outlet } from "@tanstack/react-router";
import useAuth from "../utils/useAuth";
import Sidebar from "../components/Sidebar";
import AuthContext from "../utils/AuthContext";

export const Route = createFileRoute("/menu")({
  component: Menu,
});

function Menu() {
  const data = useAuth();

  return (
    <AuthContext.Provider value={data}>
      <Sidebar />
      <Outlet />
    </AuthContext.Provider>
  );
}
