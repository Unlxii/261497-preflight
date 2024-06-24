import * as React from "react";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  return (
    <nav className="bg-[#FAF8F6] shadow-md ">
      <div className="container p-4 mx-auto max-w-screen-xl flex flex-wrap items-center justify-between ">
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
    </nav>
  );
};

export default Header;
