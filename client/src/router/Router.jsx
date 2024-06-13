import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Home, Login, Signup } from "../pages";
import App from "../App";
import { AuthProtectedRouter } from "./AuthProtectedRouter";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path=""
        element={
          <AuthProtectedRouter authentication={true}>
            <Home />
          </AuthProtectedRouter>
        }
      />
      <Route
        path="login"
        element={
          <AuthProtectedRouter authentication={false}>
            <Login />
          </AuthProtectedRouter>
        }
      />
      <Route
        path="signup"
        element={
          <AuthProtectedRouter authentication={false}>
            <Signup />
          </AuthProtectedRouter>
        }
      />
    </Route>
  )
);

export { router };
