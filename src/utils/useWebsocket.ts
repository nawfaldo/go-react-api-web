import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useReactQuerySubscription = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:4000/api/v1/ws");
    websocket.onopen = () => {
      console.log("connected");
    };
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const queryKey = [...data.entity, data.id].filter(Boolean);
      queryClient.invalidateQueries({ queryKey });
    };

    return () => {
      websocket.close();
    };
  }, [queryClient]);
};

export default useReactQuerySubscription;
