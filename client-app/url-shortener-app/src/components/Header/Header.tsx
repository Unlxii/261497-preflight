import * as React from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext"; // Adjust import path as necessary

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  if (!context) {
    return <div>Error: User context not available</div>;
  }
  const { user } = context;
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    try {
      if (user) {
        const confirmLogout = window.confirm(
          "Are you sure you want to log out?"
        );
        if (confirmLogout) {
          context.setUser(null);
          toast.success("Logout successful.");
          navigate("/login");
        }
      } else {
        toast.error("User is not logged in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="bg-[#FAF8F6] shadow-md flex items-center fixed w-full">
      <div className="container p-4 mx-auto max-w-screen-xl flex flex-wrap items-center  ">
        <text className="text-gray-900 not-italic font-Paytone One text-3xl antialiased font-bold">
          <span className="hover:drop-shadow-sm">
            KEEP.
            <sup className="text-indigo-300 not-italic font-bold top-[-25px] right-[7px] text-sm">
              yourlinks :)
            </sup>
          </span>
        </text>
      </div>
      {user ? <div className="font-bold mr-8">Hello, {user.name} </div> : null}
      <button
        type="submit"
        onClick={handleLogout}
        className="h-8 p-2 bg-red-500 hover:bg-red hover:text-white text-center text-xs text-white border-spacing-14 mr-4 text-bold rounded font-bold "
      >
        {" "}
        log out{" "}
      </button>
    </nav>
  );
};

export default Header;
