import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";
import SecondaryButton from "../../components/SecondaryButton";
import { useContext } from "react";
import AuthContext from "../../utils/AuthContext";

export const Route = createFileRoute("/menu/search")({
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

      return data.filter((u: any) => u?.name != auth?.name);
    },
  });

  return (
    <div className="space-y-6 pl-[200px]">
      {data?.map((user: any) => (
        <div className="space-y-2">
          <p>{user.name}</p>
          <div className="h-[50px] w-[90px]">
            <SecondaryButton
              text="chat"
              disabled={false}
              action={() =>
                navigate({
                  to: "/menu/chat/$userId",
                  params: { userId: user?.id },
                })
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
