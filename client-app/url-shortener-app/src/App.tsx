import * as React from "react";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Container from "./component/Container/Container";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PullingTest from "./pages/pullingtest"; // Import your PullingTest component
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  

  return (
    <UserContextProvider>
      <Header />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/main" element={<Container />}></Route>
        <Route path="/user/:userId/shortUrls" element={<PullingTest userId="6695ede207e88cf892760d8f" />} />

      </Routes>
      <Footer />
    </UserContextProvider>
  );
};

export default App;
