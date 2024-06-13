import { useContext, createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext();

const useSocketContext = () => {
  return useContext(SocketContext);
};

const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    console.log(authUser);
    if (authUser) {
      const socket = io("http://localhost:8000", {
        query: {
          userId: authUser?._id,
        },
      });
      setSocket(socket);
      console.log("user connect ", socket.id);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
        console.log("from socket context");
        console.log(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser?._id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export { useSocketContext, SocketContextProvider };
