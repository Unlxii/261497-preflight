import * as React from "react";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default App;
