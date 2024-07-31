import { createFileRoute, Outlet } from "@tanstack/react-router";
import useAuth from "../utils/useAuth";
import Sidebar from "../components/Sidebar";
import AuthContext from "../utils/AuthContext";
import { useState } from "react";
import ShowContext from "../utils/showContext";

export const Route = createFileRoute("/app")({
  component: Menu,
});

function Menu() {
  const { data, isLoading } = useAuth();

  const [isShow, setIsShow] = useState<boolean>(false);
  const [content, setContent] = useState<JSX.Element>(<div></div>);

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={data}>
      <ShowContext.Provider value={{ setIsShow, setContent }}>
        <Sidebar />
        <Outlet />
        {isShow && (
          <div className="fixed z-40 flex h-screen w-screen items-center justify-center bg-gray-300 bg-opacity-55">
            {content}
          </div>
        )}
      </ShowContext.Provider>
    </AuthContext.Provider>
  );
}
