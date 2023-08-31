import AccessPage from "../pages/AccessPage/AccessPage";
import LoginForm from "../pages/AccessPage/components/LoginForm";
import RegisterForm from "../pages/AccessPage/components/RegisterForm";
import Welcome from "../pages/AccessPage/components/Welcome";
import HomePage from "../pages/HomePage/HomePage";
import SearchPage from "../pages/SearchPage/SearchPage";
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
      }
];

export default routes