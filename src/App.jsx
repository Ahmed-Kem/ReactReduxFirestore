import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Authentification from "./pages/Authentification";
import { useAuthStore } from "./assets/utils/store/auth.store";

function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <Routes>
      <Route
        path="/Authentification"
        element={
          isLoggedIn ? <Navigate to="/Homepage" /> : <Authentification />
        }
      />
      <Route
        path="/Homepage"
        element={
          isLoggedIn ? <Homepage /> : <Navigate to="/Authentification" />
        }
      />
      <Route index element={<Navigate to="/Authentification" />} />
    </Routes>
  );
}

export default App;
