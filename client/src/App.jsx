import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AsideMenus from "./components/aside/AsideMenus";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <main className=" p-4 h-screen w-full bg-black">
      <div className="container max-w-[1200px] w-full h-full mx-auto p-2 max-[620px]:overflow-hidden flex">
        {authUser && <AsideMenus />}
        <Outlet />
        <Toaster />
      </div>
    </main>
  );
}

export default App;
