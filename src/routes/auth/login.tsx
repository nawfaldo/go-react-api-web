import { createFileRoute, useNavigate } from "@tanstack/react-router";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";
import ErrorInfo from "../../components/ErrorInfo";
import useAuth from "../../utils/useAuth";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<any>({});

  const login = useMutation({
    mutationFn: async () => {
      try {
        return await axios.post(
          `${BASE_API_URL}/login`,
          { Name: name, Password: password },
          {
            withCredentials: true,
          },
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error;
          setError({ server: axiosError.response?.data?.error });
        }
        throw error;
      }
    },
    onSuccess: () => {
      return navigate({ to: "/app/chat" });
    },
  });

  const checkInput = () => {
    let err: any = {};

    if (name === "") {
      err.name = "name is required";
    }

    if (password === "") {
      err.password = "password is required";
    }

    if (Object.keys(err).length !== 0) {
      setError(err);
      return false;
    }

    setError({});
    return true;
  };

  const handleLogin = () => {
    if (checkInput() === true) {
      login.mutate();
    }
  };

  return (
    <div className="fixed flex h-screen w-screen items-center justify-center">
      <div className="w-[350px] space-y-5">
        <p className="text-3xl font-semibold">Login</p>
        <div className="space-y-3">
          {error?.server && <ErrorInfo error={error?.server} />}
          <TextInput
            label="Name"
            value={name}
            setValue={setName}
            disable={login.isPending}
            error={error?.name}
          />
          <TextInput
            label="Password"
            value={password}
            setValue={setPassword}
            disable={login.isPending}
            error={error?.password}
          />
        </div>
        <div className="h-[50px]">
          <PrimaryButton
            text={login.isPending ? "Continuing..." : "Continue"}
            action={handleLogin}
            disabled={login.isPending}
          />
        </div>
        <p className="text-sm font-light">
          Doesn't have an account?{" "}
          <span
            className="cursor-pointer text-blue-500 underline hover:text-blue-600"
            onClick={() => navigate({ to: "/auth/register" })}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
