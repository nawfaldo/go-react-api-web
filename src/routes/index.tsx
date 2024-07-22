import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "../utils/constants";
import SecondaryButton from "../components/SecondaryButton";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}/auth`, {
          withCredentials: true,
        });
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error;
          if (axiosError.response?.data?.error === "not authorized") {
            navigate({ to: "/auth/login" });
          }
        }
        throw error;
      }
    },
  });

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

  return (
    <div>
      <p className="text-red-500">hello {data?.name}</p>
      <div className="w-[80px] h-[40px]">
        <SecondaryButton
          text={logout.isPending ? "Logging out..." : "Logout"}
          disabled={logout.isPending}
          action={() => logout.mutate()}
        />
      </div>
    </div>
  );
}
