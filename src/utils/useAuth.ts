import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "./constants";
import { useLocation, useNavigate } from "@tanstack/react-router";

const useAuth = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}/auth`, {
          withCredentials: true,
        });

        if (pathname === "/auth/login") {
          navigate({ to: "/menu/chat" });
        }

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

  return data;
};

export default useAuth;
