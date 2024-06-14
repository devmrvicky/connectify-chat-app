import { SearchBox } from "..";
import useStore from "../../zustand/store";
import AuthUserProfile from "../AuthUserProfile";
import Friends from "../Friends";

const Aside = () => {
  const { selectedFriend } = useStore((store) => store);
  return (
    <aside
      className={`max-w-[280px]  h-full overflow-auto w-full  ${
        selectedFriend && "max-[620px]:-translate-x-[110%]"
      } max-[620px]:bg-white max-[620px]:absolute z-10 max-[620px]:max-w-[100%] top-0 left-0 max-[620px]:p-4 transition-all`}
    >
      <div className="flex flex-col gap-2 w-full h-full max-[620px]:max-w-[500px] max-[620px]:mx-auto">
        <AuthUserProfile />
        <SearchBox />
        <div className="friends flex flex-col gap-2">
          <span>friends</span>
          <Friends />
        </div>
      </div>
    </aside>
  );
};

export default Aside;
