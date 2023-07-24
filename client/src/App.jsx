import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TodoPage from "./pages/TodoPage";
import TodoFormPage from "./pages/TodoFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { TodosProvider } from "./context/TodosContext";
import Navbar from "./components/Navbar";


function App() {
  return (

    <AuthProvider>
      <TodosProvider>
        <BrowserRouter>
        <main className="container mx-auto px-10">
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/todo" element={<TodoPage />} />
              <Route path="/todo/new" element={<TodoFormPage />} />
              <Route path="/todo/:id" element={<TodoFormPage />} />
            </Route>
          </Routes>
        </main>

        </BrowserRouter>
      </TodosProvider>
    </AuthProvider>
  )
}
export default App;