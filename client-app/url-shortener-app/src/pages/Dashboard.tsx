import { useContext } from "react";
import { UserContext } from "../context/userContext"; // Adjust import path as necessary

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
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      {/* Render more user details if needed */}
    </div>
  );
};

export default Dashboard;
