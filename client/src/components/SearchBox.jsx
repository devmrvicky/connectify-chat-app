import { useState } from "react";
import useSearchUsers from "../hooks/user/useSearchUsers";
import { MdClear } from "react-icons/md";
import useStore from "../zustand/store";

const SearchBox = () => {
  const [searchStr, setSearchStr] = useState("");
  const { searchFriend, clearSearchUser } = useSearchUsers();
  const { searchedFriends, selectFriend } = useStore((store) => store);

  const handleSearchFriend = (e) => {
    e.preventDefault();
    if (!searchStr) return;
    searchFriend(searchStr);
    selectFriend(null);
  };

  const searchOnChange = () => {
    // rat racing condition handle in later
    searchFriend(searchStr);
  };

  const handleClearSearch = () => {
    setSearchStr("");
    clearSearchUser();
  };

  return (
    <form
      action=""
      onSubmit={handleSearchFriend}
      className="max-[420px]:hidden"
    >
      <label className="input input-bordered flex items-center gap-2 rounded-full bg-light-bg2 dark:bg-dark-bg2 dark:text-light-text2 text-dark-text2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-6 h-6 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Search friend"
          value={searchStr}
          onChange={(e) => {
            setSearchStr(e.target.value);
            searchOnChange();
          }}
        />
        {Boolean(searchedFriends.length) && (
          <button type="button" onClick={handleClearSearch}>
            <MdClear className="w-6 h-6" />
          </button>
        )}
      </label>
    </form>
  );
};

export default SearchBox;
