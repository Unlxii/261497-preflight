import * as React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext"; // Adjust import path as necessary

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  const context = useContext(UserContext);
  if (!context) {
    return <div>Error: User context not available</div>;
  }
  const { user } = context;
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <nav className="bg-[#FAF8F6] shadow-md flex items-center">
      <div className="container p-4 mx-auto max-w-screen-xl flex flex-wrap items-center  ">
        <a
          href="http://localhost:3000"
          className="text-gray-900 not-italic font-Paytone One text-3xl antialiased font-bold"
        >
          <span className="hover:drop-shadow-sm">
            KEEP.
            <sup className="text-indigo-300 not-italic font-bold top-[-25px] right-[7px] text-sm">
              localhost
            </sup>
          </span>
        </a>
      </div>
      <div className="font-bold mr-4">Hello, {user.name} </div>
    </nav>
  );
};

export default Header;
