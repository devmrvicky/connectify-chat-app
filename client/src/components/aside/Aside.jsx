import MyContacts from "../../pages/friends/MyContacts";
import useStore from "../../zustand/store";
import SideBarLayout from "../layout/SideBarLayout";

const Aside = () => {
  const { selectedFriend } = useStore((store) => store);

  return (
    <SideBarLayout
      searchBox={true}
      hideCondition={selectedFriend}
      sidebarContentTitle="Contacts"
      className="max-[800px]:max-w-[250px] max-[720px]:hidden max-[420px]:block max-[420px]:bg-white dark:max-[420px]:bg-black max-[420px]:absolute z-10 max-[420px]:max-w-[100%] top-0 left-0 max-[420px]:p-4 max-[420px]:pb-0"
    >
      <div className="flex-1">
        <MyContacts />
      </div>
    </SideBarLayout>
  );
};

export default Aside;
