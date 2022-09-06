import styles from "./App.module.scss";
import Register from "./components/auth/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import UserPage from "./components/UserPage/UserPage";

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={isAuth ? <UserPage /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
