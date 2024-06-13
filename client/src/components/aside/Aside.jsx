import { UserProfile, SearchBox } from "..";
import AuthUserProfile from "../AuthUserProfile";
import Friends from "../Friends";

const Aside = () => {
  return (
    <aside className="min-w-[300px] h-full overflow-auto flex flex-col gap-2">
      <AuthUserProfile />
      <SearchBox />
      <div className="friends flex flex-col gap-2">
        <span>friends</span>
        <Friends />
        {/* <UserProfile />
        <div className="divider divider-vertically m-0 h-0"></div>
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile />
        <UserProfile /> */}
      </div>
    </aside>
  );
};

export default Aside;
