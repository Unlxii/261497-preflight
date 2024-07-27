import * as React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";

import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
