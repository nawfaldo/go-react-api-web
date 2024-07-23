import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SecondaryButton from "../../components/SecondaryButton";

export const Route = createFileRoute("/menu/chat/$userId")({
  component: ChatUser,
});

function ChatUser() {
  const userId = Route.useParams().userId;

  const [msg, setMsg] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_API_URL}/user`, {
        params: { ID: userId },
      });

      return data;
    },
  });

  // useReactQuerySubscription();

  return (
    <div className="fixed bottom-0 w-full py-[30px] pl-[160px] pr-7">
      <div className="mb-10 space-y-2">
        <div className="flex flex-col items-start justify-start space-y-2">
          <div className="rounded-full bg-gray-300 p-10">
            <UserIcon className="w-10" />
          </div>
          <p className="text-lg font-semibold">{data?.name}</p>
        </div>
        <p className="font-light">
          This is the beginning of your chat with {data?.name}
        </p>
      </div>
      <div className="flex space-x-5 rounded-xl bg-gray-200 py-2 pl-6 pr-3 shadow">
        <input
          type="text"
          placeholder={`Message @${data?.name}`}
          className="w-full bg-transparent text-lg focus:outline-none"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <div className="h-[45px] w-[80px]">
          <SecondaryButton disabled={false} text="Send" action={() => {}} />
        </div>
      </div>
    </div>
  );
}
