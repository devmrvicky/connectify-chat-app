import { Outlet } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import { Toaster } from "react-hot-toast";

function App() {
  
  return (
    <main className="bg-white p-4 h-screen w-full">
      <div className=" max-w-[1200px] w-full h-full mx-auto p-2">
        {/* <Home />
        <Login />
        <Signup /> */}
        <Outlet />
        <Toaster />
      </div>
    </main>
  );
}

export default App;
