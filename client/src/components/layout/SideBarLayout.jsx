import { SearchBox } from "..";
import Logo from "../Logo";

const SideBarLayout = ({
  children,
  hideCondition,
  searchBox = false,
  sidebarContentTitle,
}) => {
  return (
    <aside
      className={`max-w-[280px]  h-full overflow-auto w-full  ${
        hideCondition && "max-[620px]:-translate-x-[110%]"
      } max-[620px]:bg-white max-[620px]:absolute z-10 max-[620px]:max-w-[100%] top-0 left-0 max-[620px]:p-4 transition-all`}
    >
      <div className="flex flex-col gap-2 w-full h-full max-[620px]:max-w-[500px] max-[620px]:mx-auto">
        <Logo />
        {searchBox && <SearchBox />}
        <div className="side-bar-content flex flex-col gap-2">
          <span>{sidebarContentTitle}</span>
          {children}
        </div>
      </div>
    </aside>
  );
};

export default SideBarLayout;
