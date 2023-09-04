import AccessPage from "../pages/AccessPage/AccessPage";
import LoginForm from "../pages/AccessPage/components/LoginForm";
import RegisterForm from "../pages/AccessPage/components/RegisterForm";
import Welcome from "../pages/AccessPage/components/Welcome";
import HomePage from "../pages/HomePage/HomePage";
import ReservasPage from "../pages/ReservasPage/ReservasPage";
import RoomManagementPage from "../pages/RoomManagementPage/RoomManagementPage";
import RoomPage from "../pages/RoomPage/RoomPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import UpdateReservasPage from "../pages/UpdateReservasPage/UpdateReservasPage";
import ProtectedRoute from "./ProtectedRoute";

const routes = [
    {
        path: '/',
        component: <AccessPage />,
        routes: [
          {
            path: '/',
            component: <Welcome />,
          },
          {
            path: '/login',
            component: <LoginForm />,
          },
          {
            path: '/register',
            component: <RegisterForm />,
          },
        ],
      },
      {
        path: '/home',
        component: <HomePage />,
        protection: <ProtectedRoute
            roles={["user", "admin"]} />
      },
      {
        path: '/search',
        component: <SearchPage />,
        protection: <ProtectedRoute roles={["user", "admin"]} />
      },
      {
        path: '/room/:id',
        component: <RoomPage />,
        protection: <ProtectedRoute roles={["user", "admin"]} />
      },
      {
        path: '/reservas',
        component: <ReservasPage />,
        protection: <ProtectedRoute roles={["user", "admin"]} />
      },
      {
        path: '/room-management',
        component: <RoomManagementPage />,
        protection: <ProtectedRoute roles={["admin"]} />
      },
      {
        path: '/update-reservas',
        component: <UpdateReservasPage />,
        protection: <ProtectedRoute roles={["admin"]} />
      }
];

export default routes