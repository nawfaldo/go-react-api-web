import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/menu/chat")({
  component: Chat,
});

function Chat() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
