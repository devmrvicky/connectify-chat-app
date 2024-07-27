import {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import useStore, { useFriendStore } from "../zustand/store";
import { apiGet } from "../api/api";
import { addData } from "../indexDB/indexdb";
import { useAuthContext } from "./AuthContext";
import { VscLoading } from "react-icons/vsc";
import toast from "react-hot-toast";

const LatestDataContext = createContext();

const useLatestData = () => useContext(LatestDataContext);

const LatestDataProvider = ({ children }) => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const { myContacts, setMyContacts } = useFriendStore((store) => store);
  const { selectedFriend, setMessages } = useStore((store) => store);

  const { authUser } = useAuthContext();

  const fetchLatestContactsList = useCallback(() => {
    apiGet("friend/get-all-friends")
      .then((res) => {
        if (res.status) {
          const contacts = res?.friends?.map((friend) =>
            friend.senderId._id === authUser?._id
              ? friend.receiverId
              : friend.senderId
          );
          addData({
            storeName: `contacts_list`,
            data: contacts,
          })
            .then(() => {
              console.log("add successfully data");
              console.log(contacts);
              setMyContacts(contacts);
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsDataLoading(false));
  }, []);
  // fetch latest messages
  const fetchLatestChats = useCallback(() => {
    console.log("call fetchLatestsChats function");
    if (!selectedFriend) return;
    apiGet(`messages/${selectedFriend?._id}`)
      .then((data) => {
        if (!data.status) {
          // toast.error(data.message);
          throw new Error(data.message);
        }
        console.log("chats ", data);
        addData({
          storeName: "chats",
          data: data.messages,
        })
          .then(() => {
            conosle.log("chats added to indexDB");
            setMessages(data.messages);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error))
      .finally(() => setIsDataLoading(false));
  }, [selectedFriend, selectedFriend?._id]);

  useEffect(() => {
    (() => {
      if (!authUser) return;
      setIsDataLoading(true);
      fetchLatestContactsList();
      // fetchLatestChats();
    })();
  }, [authUser, setMyContacts]);

  return (
    <LatestDataContext.Provider value={{ isDataLoading }}>
      {children}
      {isDataLoading && (
        <div className="w-10 h-10 rounded-full flex items-center justify-center fixed bottom-3 right-3 z-50 bg-while/50 backdrop-blur-lg">
          <VscLoading className="animate-spin text-white" />
        </div>
      )}
    </LatestDataContext.Provider>
  );
};

export { useLatestData, LatestDataProvider };
