import * as React from "react";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  return (
    <div className="bg-[#FAF8F6] shadow-lg">
      <div className="container p-2 mx-auto">
        <nav className="py-3">
          <a
            href="http://localhost:3001"
            className="text-gray-900 not-italic font-Paytone One text-3xl antialiased font-bold"
          >
            <span className="hover:drop-shadow-sm">
              KEEP.
              <sup className="text-indigo-300 not-italic font-bold top-[-25px] right-[7px] text-sm">
                localhost
              </sup>
            </span>
          </a>
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 left-[1440px] bottom-10">
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
