import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"

function ProtectedRoute() {

  const { isAuthenticated, loading } = useAuth()
  console.log('isAuthenticated', isAuthenticated, 'loading', loading)

  if(loading) return <h1>Loading...</h1>
  if(!isAuthenticated && !loading) return <Navigate to='/login' replace/>  
  return (
    <Outlet />
  )
}

export default ProtectedRoute