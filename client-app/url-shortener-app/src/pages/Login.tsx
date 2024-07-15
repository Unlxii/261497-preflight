import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/auth/login",
        {
          email,
          password,
        }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex p-4 justify-center bg-blue-400">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h1 className="text-center font-bold text-xl">Sign In</h1>
        <form onSubmit={loginUser} className="w-screen">
          <label>Email</label>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <label>Password</label>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="h-7 bg-blue-500 text-center text-xs text-white rounded w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
