import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

interface ProtectedRouteProps {
  roles?: string[]
}


function ProtectedRoute({ roles }: ProtectedRouteProps) {
    const navigate = useNavigate()
    const isAuthenticated = localStorage.getItem("token")
    const userRole = "user"
    useEffect(() => {
        if (!isAuthenticated) {
          navigate("/login")
        }
    }, [isAuthenticated, navigate])
  
    if (roles && !roles.includes(userRole)) {
      navigate("/home")
      return <></>
    }
  
    return <Outlet />
  }
  
  export default ProtectedRoute
