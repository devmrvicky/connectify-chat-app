import { NavLink } from "react-router-dom";
import MyContacts from "../../pages/friends/MyContacts";
import useStore from "../../zustand/store";
import AuthAvatarProfile from "../AuthAvatarProfile";
import SideBarLayout from "../layout/SideBarLayout";
import { useMediaQuery } from "@uidotdev/usehooks";
import { HiChat, HiOutlineChat } from "react-icons/hi";
import { RiUserAddFill, RiUserAddLine } from "react-icons/ri";
import MenuItems from "../MenuItems";

const Aside = () => {
  const { selectedFriend } = useStore((store) => store);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 420px)");

  const menus = [
    {
      name: "Chat",
      path: "/",
      icon: <HiOutlineChat className="w-8 h-8" />,
      activeIcon: <HiChat className="w-8 h-8 text-zinc-300" />,
    },
    {
      name: "Add friends",
      path: "/friends",
      icon: <RiUserAddLine className="w-8 h-8" />,
      activeIcon: <RiUserAddFill className="w-8 h-8 text-zinc-300" />,
    },
  ];

  return (
    <SideBarLayout
      searchBox={true}
      hideCondition={selectedFriend}
      sidebarContentTitle="Contacts"
      className="max-[800px]:max-w-[250px] max-[720px]:hidden max-[420px]:block max-[420px]:bg-white max-[420px]:absolute z-10 max-[420px]:max-w-[100%] top-0 left-0 max-[420px]:p-4 max-[420px]:pb-0"
    >
      <div className="flex-1">
        <MyContacts />
      </div>
      {/* {isSmallDevice && (
        <div className="w-full border-t flex items-center justify-center py-1">
          <MenuItems
            menus={menus}
            className="gap-0 flex-1 items-center justify-between"
          />
          <div className="bottom-profile flex-1 flex justify-end">
            <AuthAvatarProfile />
          </div>
        </div>
      )} */}
    </SideBarLayout>
  );
};

export default Aside;
