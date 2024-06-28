import { CiMenuBurger } from "react-icons/ci";
import SideBarLayout from "../layout/SideBarLayout";
import useStore from "../../zustand/store";
import MyContacts from "../../pages/friends/MyContacts";
import FriendSideBar from "./FriendSideBar";

const SideBarDrawer = () => {
  const { currentActivePage } = useStore((store) => store);
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn drawer-button p-0 bg-transparent border-0"
        >
          {/* <button> */}
          <CiMenuBurger className="w-8 h-8" />
          {/* </button> */}
        </label>
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu  text-base-content min-h-full w-80 p-4 bg-black">
          {currentActivePage === "chat" && (
            <SideBarLayout
              searchBox={true}
              sidebarContentTitle="Contacts"
              className="max-[800px]:max-w-[250px]"
            >
              <MyContacts />
            </SideBarLayout>
          )}
          {currentActivePage === "friends" && (
            <FriendSideBar willHideSideBar={false} />
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideBarDrawer;
