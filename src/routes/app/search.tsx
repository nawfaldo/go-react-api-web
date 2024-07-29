import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";
import SecondaryButton from "../../components/SecondaryButton";
import { useContext } from "react";
import AuthContext from "../../utils/AuthContext";

export const Route = createFileRoute("/app/search")({
  component: Search,
});

function Search() {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["get-users"],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_API_URL}/users`, {
        withCredentials: true,
      });

      return data?.filter((u: any) => u?.name !== auth?.name);
    },
  });

  const getOrCreateChat = useMutation({
    mutationFn: (chatData: { UserOne: string; UserTwo: string }) => {
      return axios.post(`${BASE_API_URL}/to-chat`, chatData, {
        withCredentials: true,
      });
    },
    onSuccess: (res) => {
      navigate({ to: "/app/chat/$chatId", params: { chatId: res.data } });
    },
  });

  const handleToChat = (UserTwo: string) => {
    getOrCreateChat.mutate({ UserOne: auth?.id, UserTwo: UserTwo });
  };

  return (
    <div className="space-y-6 pl-[200px]">
      {data?.map((user: any) => (
        <div className="space-y-2" key={user?.name}>
          <p>{user.name}</p>
          <div className="h-[50px] w-[90px]">
            <SecondaryButton
              text="chat"
              disabled={false}
              action={() => handleToChat(user?.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
