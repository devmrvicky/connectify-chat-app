import { AiFillBell, AiOutlineBell } from "react-icons/ai";
import { SearchBox } from "..";
import Logo from "../Logo";
import MenuItems from "../MenuItems";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { useMediaQuery } from "@uidotdev/usehooks";
import AuthAvatarProfile from "../AuthAvatarProfile";
import { HiChat, HiOutlineChat } from "react-icons/hi";
import { RiUserAddFill, RiUserAddLine } from "react-icons/ri";
import BottomMenus from "../BottomMenus";

/*
max-[720px]:bg-white max-[720px]:absolute z-10 max-[720px]:max-w-[100%] top-0 left-0 max-[720px]:p-4
*/

const SideBarLayout = ({
  children,
  hideCondition = false,
  searchBox = false,
  sidebarContentTitle,
  className,
}) => {
  const menus = [
    {
      name: "Search",
      path: "/search",
      activeIcon: <CiSearch className="w-7 h-7 text-zinc-300" />,
      icon: <CiSearch className="w-7 h-7" />,
    },
    {
      name: "Notification",
      path: "/notifications",
      activeIcon: <AiFillBell className="w-7 h-7 text-zinc-300" />,
      icon: <AiOutlineBell className="w-7 h-7" />,
    },
  ];

  const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");

  return (
    <aside
      className={`max-w-[280px]  h-full overflow-auto w-full  ${
        hideCondition && isSmallDevice && "-translate-x-[110%]"
      }  transition-all ${className}`}
    >
      <div className="flex flex-col gap-2 w-full h-full max-[720px]:max-w-[500px] max-[720px]:mx-auto">
        <div className="aside-head flex">
          <Logo />
          {isSmallDevice && (
            <>
              <MenuItems menus={menus} className="justify-end" />
              <button type="button">
                <CgMoreVerticalAlt className="w-7 h-7" />
              </button>
            </>
          )}
        </div>
        {searchBox && <SearchBox />}
        <div className="side-bar-content flex flex-col w-full h-full gap-2">
          <span>{sidebarContentTitle}</span>
          {children}
          <BottomMenus />
        </div>
      </div>
    </aside>
  );
};

export default SideBarLayout;
