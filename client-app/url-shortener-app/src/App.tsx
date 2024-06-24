import * as React from "react";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Container from "./component/Container/Container";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <>
      <Header />
      <Container />
      <Footer />
    </>
  );
};

export default App;
