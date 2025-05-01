import { useRef } from "react";
import { baseApi } from "../utils/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/userSlice";
import { useNavigate } from "react-router";

const LogIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async () => {
    const emailId = emailRef.current.value?.toLowerCase();
    const password = passwordRef.current.value;

    // Check if email and password are not empty
    if (!emailId || !password) {
      alert("Please enter both email and password.");
      return;
    }

    console.log(emailId, password); // Log values to ensure they are correct

    try {
      // Make API request with email and password
      const res = await axios.post(`${baseApi}/login`, {
        emailId,
        password
      },{withCredentials:true});
      dispatch(addUser(res.data))
      console.log("Login successful:", res.data);
      navigate('/')
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center mt-40">
      <div className="flex justify-center card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login</h2>
          <div className="space-y-4">
            <label className="input flex items-center gap-2">
              <span className="text-sm">Email</span>
              <input
                type="email"
                className="grow"
                placeholder="you@example.com"
                ref={emailRef}
              />
            </label>

            <label className="input flex items-center gap-2">
              <span className="text-sm">Password</span>
              <input
                type="password"
                className="grow"
                placeholder="Enter your password"
                ref={passwordRef}
              />
            </label>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary mt-4" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
