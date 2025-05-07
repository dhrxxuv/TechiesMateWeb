import { useRef, useState } from "react";
import { baseApi } from "../utils/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/userSlice";
import { useNavigate } from "react-router";

const LogIn = () => {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const emailId = emailRef.current.value?.toLowerCase();
    const password = passwordRef.current.value;

    if (!emailId || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.post(
        `${baseApi}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-6">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="space-y-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Login</h2>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input
                type="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 hover:border-gray-400"
                placeholder="you@example.com"
                ref={emailRef}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Password</span>
              <input
                type="password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 hover:border-gray-400"
                placeholder="Enter your password"
                ref={passwordRef}
              />
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-xs sm:text-sm animate-fade-in">{error}</p>
          )}

          <button
            className="w-full py-2 px-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium rounded-lg hover:from-gray-800 hover:to-gray-950 transition-all duration-300 hover:shadow-lg"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;