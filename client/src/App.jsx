import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AsideMenus from "./components/aside/AsideMenus";
import { useAuthContext } from "./context/AuthContext";
import useListMessages from "./hooks/chat/useListMessages";

function App() {
  const { authUser } = useAuthContext();
  // we call this hook here because I want to show message notification on sidebar of home page when user receive any message
  useListMessages();
  return (
    <main className=" p-4 h-screen w-full bg-white dark:bg-black">
      <div className="container max-w-[1200px] w-full h-full mx-auto p-2 max-[620px]:overflow-hidden flex">
        {authUser && <AsideMenus />}
        <Outlet />
        <Toaster />
      </div>
    </main>
  );
}

export default App;
