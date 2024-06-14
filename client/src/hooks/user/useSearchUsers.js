import { apiGet } from "../../api/api";
import toast from "react-hot-toast";
import useStore from "../../zustand/store";

const useSearchUsers = () => {
  const { setSearchedFriends } = useStore((store) => store);

  const searchFriend = async (searchStr) => {
    try {
      const data = await apiGet(`user/all-users`);
      if (!data.status) {
        toast.error(data.message);
        throw new Error(data.message);
      }
      const friends = data.users.filter(
        (user) =>
          user.fullName.includes(searchStr) || user.username.includes(searchStr)
      );
      setSearchedFriends(friends);
    } catch (error) {
      console.log("error occurs in useSearchUsers hook :", error.message);
      toast.error(error.message, {
        id: "search error",
      });
    }
  };

  const clearSearchUser = () => {
    setSearchedFriends([]);
  };

  return { searchFriend, clearSearchUser };
};

export default useSearchUsers;
