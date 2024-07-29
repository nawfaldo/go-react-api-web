import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";
import SecondaryButton from "../../components/SecondaryButton";
import { useContext } from "react";
import AuthContext from "../../utils/AuthContext";

export const Route = createFileRoute("/app/account")({
  component: Account,
});

function Account() {
  const queryClient = useQueryClient();

  const logout = useMutation({
    mutationFn: async () => {
      return await axios.post(`${BASE_API_URL}/logout`, null, {
        withCredentials: true,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const data = useContext(AuthContext);

  return (
    <div className="space-y-3 px-10 pt-10">
      <p className="text-red-500">hello {data?.name}</p>
      <div className="h-[40px] w-[80px]">
        <SecondaryButton
          text={logout.isPending ? "Logging out..." : "Logout"}
          disabled={logout.isPending}
          action={() => logout.mutate()}
        />
      </div>
    </div>
  );
}
