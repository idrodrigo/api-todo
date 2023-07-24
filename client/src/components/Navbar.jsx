import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {

  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
    <h1 className="text-2xl font-bold">
      <Link to={isAuthenticated ? "/todo" : "/"}>Todos</Link>
    </h1>
    <ul className="flex gap-x-2">
      {isAuthenticated ? (
        <>
          <li>
            Welcome {user.username}
          </li>
          <li>
            <Link to="/todo/new">Todo</Link>
          </li>
          <li>
            <Link to="/" onClick={() => logout()}>
              Logout
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link 
              to="/login"
              className="bg-indigo-500 hover:bg-indigo-700 py-2 px-4 rounded transition-colors"
            >Login</Link>
          </li>
          <li>
            <Link 
              to="/register"
              className="bg-indigo-500 hover:bg-indigo-700 py-2 px-4 rounded transition-colors"
              >Register</Link>
          </li>
        </>
      )}
    </ul>
  </nav>
  )
}

export default Navbar