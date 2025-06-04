import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AssetListPage from "./pages/AssetListPage";
import AssetDetailPage from "./pages/AssetDetailPage";
import CreateAssetPage from "./pages/CreateAssetPage";
import LoginForm from "./components/LoginForm";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<AssetListPage />} />
            <Route path="assets/new" element={<CreateAssetPage />} />
            <Route path="assets/:id" element={<AssetDetailPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
