import { createFileRoute } from "@tanstack/react-router";
import { useContext, useEffect, useRef, useState } from "react";
import SecondaryButton from "../../components/SecondaryButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../../utils/constants";
import axios from "axios";
import AuthContext from "../../utils/AuthContext";

export const Route = createFileRoute("/app/chat/$chatId")({
  component: ChatUser,
});

function ChatUser() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const websocket = useRef<any>(null);

  const chatId = Route.useParams().chatId;

  useEffect(() => {
    websocket.current = new WebSocket(
      `ws://localhost:4000/api/v1/ws/${chatId}`,
    );

    websocket.current.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages = []) => [...prevMessages, message]);
    };

    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, [chatId]);

  const auth = useContext(AuthContext);

  const sendMessage = useMutation({
    mutationFn: () => {
      return axios.post(
        `${BASE_API_URL}/message`,
        { chat_id: chatId, message: msg, name: auth?.name },
        {
          withCredentials: true,
        },
      );
    },
    onSuccess: () => {
      setMsg("");
    },
  });

  useQuery({
    queryKey: [`chat-${chatId}`],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_API_URL}/message`, {
        withCredentials: true,
        params: {
          chat_id: chatId,
        },
      });

      setMessages(data.length === 0 ? [] : data);

      return data;
    },
  });

  const { data } = useQuery({
    queryKey: ["chat-users"],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_API_URL}/chat-users`, {
        withCredentials: true,
        params: {
          chat_id: chatId,
        },
      });

      return data;
    },
  });

  return (
    <div className="fixed bottom-0 w-full pl-[320px] pr-[20px]">
      <div className="fixed top-0 z-20 -ml-[20px] flex h-[50px] w-full items-center justify-between bg-[#F5F7F8] px-[20px] shadow">
        {data?.length === 1 && (
          <div className="flex items-center space-x-2">
            <div className="h-[30px] w-[30px] rounded-full bg-gray-500"></div>
            <p className="font-semibold">{data[0]?.name}</p>
          </div>
        )}
      </div>
      <div className="space-y-5">
        {messages?.map((m: any, index: any) => (
          <div className="flex space-x-2" key={index}>
            <div className="h-[40px] w-[40px] rounded-full bg-gray-500"></div>
            <div>
              <p className="font-semibold">{m?.name}</p>
              <p className="font-light">{m?.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex space-x-5 rounded-lg bg-[#EEEEEE] py-3 pl-6 pr-2">
        <input
          type="text"
          placeholder={`Message @`}
          className="w-full bg-transparent text-lg focus:outline-none"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <div className="h-[45px] w-[80px]">
          <SecondaryButton
            disabled={sendMessage.isPending}
            text={sendMessage.isPending ? "Sending..." : "Send"}
            action={() => {
              sendMessage.mutate();
            }}
          />
        </div>
      </div>
      <div className="mt-2 rounded-t-xl bg-[#EEEEEE] pb-[30px]"></div>
    </div>
  );
}
