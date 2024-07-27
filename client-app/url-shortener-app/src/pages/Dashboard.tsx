import { useContext } from "react";
import { UserContext } from "../context/userContext";
import Container from "../components/Container/Container";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const Dashboard = () => {
  const context = useContext(UserContext);

  // Ensure context is defined
  if (!context) {
    return <div>Error: User context not available</div>;
  }

  const { user } = context;

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
