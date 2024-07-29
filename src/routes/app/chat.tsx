import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/app/chat")({
  component: Chat,
});

function Chat() {
  const { data } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_API_URL}/chats`, {
        withCredentials: true,
      });

      return data;
    },
  });

  const navigate = useNavigate();

  const { pathname } = useLocation();

  return (
    <div>
      <div className="fixed h-screen bg-[#EEEEEE] pl-[80px]">
        <div className="fixed z-30 h-[50px] w-[220px] bg-[#EEEEEE] shadow"></div>
        <div className="mb-3 mt-[70px] px-4">
          <p className="text-lg font-medium">Messages</p>
        </div>
        {data?.map((c: any) => (
          <div
            className={`mx-[10px] flex w-[200px] cursor-pointer items-center space-x-3 rounded-lg px-4 py-2 hover:bg-gray-200 ${pathname.endsWith(c?.chat_id) && "bg-gray-200"}`}
            key={c?.chat_id}
            onClick={() =>
              navigate({
                to: "/app/chat/$chatId",
                params: { chatId: c?.chat_id },
              })
            }
          >
            <div className="rounded-full bg-gray-500 p-4"></div>
            <p className="font-light">{c?.user_name}</p>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
