import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ServerUrl } from "../helper/Constants";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post(`${ServerUrl}/auth/register`, {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ name: "", email: "", password: "" });
        toast.success("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-cyan-500 to-blue-500 justify-center items-center">
      <div className="p-4">
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="text-center text-4xl text-blue-700 font-bold">
            KEEP.
          </div>
          <h1 className="text-center font-bold text-xl">Sign Up</h1>
          <div className="text-center mb-2"></div>
          <form onSubmit={registerUser} className="w-screen">
            <label>Username</label>
            <input
              type="text"
              placeholder="e.g FullStack"
              maxLength={16}
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="Email Address"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button
              type="submit"
              className="h-7 bg-blue-500 hover:bg-blue-600 text-center text-xs text-white rounded w-full"
            >
              Sign Up
            </button>
          </form>
          <div className="text-gray-500 text-sm mt-2">
            Already registered?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
