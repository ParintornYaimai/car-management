import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import CarListPage from "./pages/CarListPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/cars"
        element={ 
          <ProtectedRoute>
            <CarListPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;
