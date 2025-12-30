import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!authUser) {
      if (socket) socket.close();
      setSocket(null);
      return;
    }

    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"], // ✅ IMPORTANT
      query: { userId: authUser._id }
    });

    setSocket(newSocket);

    newSocket.on("getOnlineUsers", setOnlineUsers);

    return () => newSocket.close();
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
