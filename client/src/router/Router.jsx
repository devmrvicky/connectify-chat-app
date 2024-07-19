import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  EmailPage,
  VerifyOtp,
  FriendsPage,
  AllUsers,
  SendedFriendRequests,
} from "../pages";
import App from "../App";
import { AuthProtectedRouter } from "./AuthProtectedRouter";
import SignupProtectedRouter from "./SignupProtectedRouter";
import FriendRequests from "../pages/friends/FriendRequests";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import ChatNotifications from "../pages/notifications/ChatNotifications";
import FriendNotifications from "../pages/notifications/FriendNotifications";
import MediaPage from "../pages/media/MediaPage";

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
        path="send-otp"
        element={
          <AuthProtectedRouter authentication={false}>
            <SignupProtectedRouter>
              <EmailPage />
            </SignupProtectedRouter>
          </AuthProtectedRouter>
        }
      />
      <Route
        path="verify-otp"
        element={
          <AuthProtectedRouter authentication={false}>
            <SignupProtectedRouter>
              <VerifyOtp />
            </SignupProtectedRouter>
          </AuthProtectedRouter>
        }
      />
      <Route
        path="signup"
        element={
          <AuthProtectedRouter authentication={false}>
            <SignupProtectedRouter>
              <Signup />
            </SignupProtectedRouter>
          </AuthProtectedRouter>
        }
      />
      <Route
        path="friends"
        element={
          <AuthProtectedRouter authentication={true}>
            <FriendsPage />
          </AuthProtectedRouter>
        }
        exact={true}
      >
        <Route path="" element={<AllUsers />}></Route>
        <Route path="requests" element={<FriendRequests />}></Route>
        <Route
          path="send-friend-requests"
          element={<SendedFriendRequests />}
        ></Route>
      </Route>
      {/* notification page router */}
      <Route
        path="notifications"
        element={
          <AuthProtectedRouter authentication={true}>
            <NotificationsPage />
          </AuthProtectedRouter>
        }
      >
        <Route path="chats" element={<ChatNotifications />} />
        <Route path="friends" element={<FriendNotifications />} />
      </Route>
      {/* media page */}
      <Route
        path="media"
        element={
          <AuthProtectedRouter authentication={true}>
            <MediaPage />
          </AuthProtectedRouter>
        }
      />
    </Route>
  )
);

export { router };
