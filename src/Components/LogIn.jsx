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
      console.log(err)
      setError(err?.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="card bg-neutral text-neutral-content w-96 shadow-xl">
        <div className="card-body items-center text-center space-y-4">
          <h2 className="card-title text-2xl mb-2">Login</h2>

          <label className="input input-bordered flex items-center gap-2 w-full">
            <span className="text-sm">Email</span>
            <input
              type="email"
              className="grow"
              placeholder="you@example.com"
              ref={emailRef}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 w-full">
            <span className="text-sm">Password</span>
            <input
              type="password"
              className="grow"
              placeholder="Enter your password"
              ref={passwordRef}
            />
          </label>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button className="btn btn-primary w-full mt-2" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
