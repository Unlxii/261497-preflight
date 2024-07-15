import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
      const { data } = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ name: "", email: "", password: "" });
        toast.success("Login Successful, Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex p-4 justify-center bg-blue-400">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h1 className="text-center font-bold text-xl">Sign Up</h1>
        <div className="text-center mb-2">
          <text className="text-gray-500">
            Already registered?{" "}
            <a href="/login" className="text-blue-500">
              Sign In
            </a>
          </text>
        </div>
        <form onSubmit={registerUser} className="w-screen">
          <label>Username</label>
          <input
            type="text"
            placeholder="e.g FullStack"
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
          <div className="bg-blue-500 text-center text-xs text-white rounded">
            <button type="submit" className="h-7">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
