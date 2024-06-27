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
    >
      <MyContacts />
    </SideBarLayout>
  );
};

export default Aside;
