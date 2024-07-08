import { AiFillBell, AiOutlineBell } from "react-icons/ai";
import Logo from "../Logo";
import MenuItems from "../MenuItems";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { useMediaQuery } from "@uidotdev/usehooks";
import BottomMenus from "../BottomMenus";

// this is side bar layout. we have different types of side bar. but layout of all sides are same. so keep consistent layout of side bar we have made this SideBarLayout component
// SideBarLayout component takes some props
// 1. children:- side bar layout receives actual side bar content as children
// 2. hideCondition:- this is side bar hidden condition when side bar should be hidden. like on mobile devices or when user click on side bar listed item
// 3. sidebarContentTitle:- this is side bar title
// 4. className:- if want to some changes in default layout of side bar then pass className props

// this SideBarLayout is also responsive for default ui for small screen devices like mobile devices. So for those small screen devices we are using a hook called 'useMediaQuery' that takes css media query as a string. this hook detect when it's condition will satisfy and then return true otherwise it return false
const SideBarLayout = ({
  children,
  hideCondition = false,
  sidebarContentTitle,
  className,
}) => {
  const menus = [
    {
      name: "Search",
      // path: "/search",
      path: "/",
      activeIcon: (
        <CiSearch className="w-7 h-7 text-zinc-300 dark:text-zinc-600" />
      ),
      icon: <CiSearch className="w-7 h-7" />,
    },
    {
      name: "Notification",
      path: "/notifications",
      activeIcon: (
        <AiFillBell className="w-7 h-7 text-zinc-300 dark:text-zinc-600" />
      ),
      icon: <AiOutlineBell className="w-7 h-7" />,
    },
  ];

  const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");

  return (
    <aside
      className={`max-w-[280px]  h-full w-full  ${
        hideCondition && isSmallDevice && "-translate-x-[110%]"
      }  transition-all ${className}`}
    >
      <div className="flex flex-col gap-2 w-full h-full max-[720px]:max-w-[500px] max-[720px]:mx-auto">
        <div className="aside-head flex">
          <Logo />
          {/* on small devices these menus items will be show */}
          {isSmallDevice && (
            <>
              <MenuItems
                menus={menus}
                className="max-[420px]:justify-end max-[420px]:gap-0"
              />
              <button type="button">
                <CgMoreVerticalAlt className="w-7 h-7" />
              </button>
            </>
          )}
        </div>
        <div className="divider m-0 mt-2"></div>
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
