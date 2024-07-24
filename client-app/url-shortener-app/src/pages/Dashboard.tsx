import { useContext } from "react";
import { UserContext } from "../context/userContext"; // Adjust import path as necessary
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
    <div>
      <Header />
      <Container />
      <Footer />
    </div>
  );
};

export default Dashboard;
