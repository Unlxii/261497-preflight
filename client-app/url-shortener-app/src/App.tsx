import * as React from "react";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Container from "./component/Container/Container";
import Register from "./pages/Regiser";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/main" element={<Container />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
