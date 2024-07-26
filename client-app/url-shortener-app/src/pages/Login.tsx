import React, { useState, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { ServerUrl } from "../helper/Constants";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post(`${ServerUrl}/auth/login`, {
        email,
        password,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        const user = response.data.user; // Assuming the response contains user data
        setUser(user);
        setData({
          email: "",
          password: "",
        });
        toast.success("Login Successful, Welcome!");
        navigate("/dashboard");
        toast.success(`Login successful. Welcome back, ${user.name}!`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="flex h-screen bg-blue-400 justify-center items-center">
      <div className="p-4">
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
              className="h-7 bg-blue-500 text-center text-xs text-white rounded w-full mt-1"
            >
              Submit
            </button>
          </form>
          <div className="text-gray-500 mt-4 text-sm">
            don't have an account?{" "}
            <a className="text-blue-500" href="/register">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
