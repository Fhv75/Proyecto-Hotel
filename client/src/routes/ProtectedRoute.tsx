import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

interface ProtectedRouteProps {
  roles?: string[];
}

function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const isAuthenticated = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:5000/cliente/${userId}/role`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUserRole(response.data.rol);
        })
        .catch((error) => {
          console.error("Error al obtener el rol del usuario:", error);
        });
        if (roles && userRole && !roles.includes(userRole)) {
          navigate("/home");
        }
    }
  }, [isAuthenticated, userId, roles, userRole, navigate]);

  return <Outlet />;
}

export default ProtectedRoute;
