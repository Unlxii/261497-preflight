import * as React from "react";
import axios from "axios";
import { useState } from "react";
import { ServerUrl } from "../../helper/Constants";
import { useUserContext } from "../../context/userContext";
interface IFormContainerProps {
  addUrl: (url: string) => Promise<void>;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = () => {
  const [url, setUrl] = useState<string>("");
  const { user } = useUserContext();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      console.error("User is not logged in");
      return;
    }
    try {
      await axios.post(`${ServerUrl}/shortUrl`, {
        fullUrl: url,
        userId: user._id,
      });
      setUrl("");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto p-2">
      <div className="bg-banner my-8 rounded-xl bg-cover">
        <h2 className="text-center text-gray-900 not-italic font-Paytone One text-[64px] antialiased font-bold pt-48">
          "KEEP YOUR URLs"
        </h2>
        <p className="text-center text-gray-900 not-italic font-Paytone One text-[22px] antialiased font-normal pb-32 ">
          This tool for shorten a URL or reduce link :)
        </p>
        <form className="max-w-[956px] mx-auto" onSubmit={handleSubmit}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-#FAF8F6 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-#1D1C1A border border-[#FAF8F6] rounded-full bg-#FAF8F6 focus:ring-#FAF8F6 focus:border-#FAF8F6 dark:bg-#FAF8F6 dark:border-#FAF8F60 dark:placeholder-#FAF8F6 dark:text-#1D1C1A dark:focus:ring-#FAF8F6 dark:focus:border-#FAF8F6 shadow-lg focus:outline-slate-100"
              placeholder=" paste your link to shorten here."
              required
              value={url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUrl(e.target.value)
              }
            />
            <button
              type="submit"
              className="absolute top-2 end-2.5 p-2.5 text-sm font-medium h-lg text-black-100 bg-gray-200 rounded-full border-#1D1C1ADB focus:ring-2 focus:outline-none"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
