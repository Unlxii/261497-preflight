import * as React from "react";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Container from "./component/Container/Container";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";
interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/main" element={<Container />}></Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
