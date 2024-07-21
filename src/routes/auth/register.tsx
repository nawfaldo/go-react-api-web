import { createFileRoute, useNavigate } from "@tanstack/react-router";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";

export const Route = createFileRoute("/auth/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useMutation({
    mutationFn: (userData: {
      Name: string;
      Email: string;
      Password: string;
    }) => {
      return axios.post(`${BASE_API_URL}/register`, userData, {
        withCredentials: true,
      });
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-y-5 w-[350px]">
        <p className="font-semibold text-3xl">Register</p>
        <div className="space-y-3">
          <TextInput
            label="Name"
            value={name}
            setValue={setName}
            disable={login.isPending}
          />
          <TextInput
            label="Email"
            value={email}
            setValue={setEmail}
            disable={login.isPending}
          />
          <TextInput
            label="Password"
            value={password}
            setValue={setPassword}
            disable={login.isPending}
          />
        </div>
        <div className="h-[50px]">
          <PrimaryButton
            text={login.isPending ? "Continuing..." : "Continue"}
            action={() =>
              login.mutate({ Name: name, Email: email, Password: password })
            }
            disabled={login.isPending}
          />
        </div>
        <p className="text-sm font-light">
          Already have an account?{" "}
          <span
            className="text-blue-500 underline cursor-pointer hover:text-blue-600"
            onClick={() => navigate({ to: "/auth/login" })}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
