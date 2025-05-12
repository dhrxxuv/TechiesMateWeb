import { useRef, useState } from "react";
import { baseApi } from "../utils/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/userSlice";
import { useNavigate } from "react-router";

const LogIn = () => {
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Refs for form inputs
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const skillsRef = useRef();
  const aboutRef = useRef();
  const locationRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        const emailId = emailRef.current.value?.toLowerCase();
        const password = passwordRef.current.value;

        if (!emailId || !password) {
          throw new Error("Please enter both email and password.");
        }

        const res = await axios.post(
          `${baseApi}/login`,
          { emailId, password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        navigate("/");
      } else {
  
        const userData = {
          emailId: emailRef.current.value?.toLowerCase(),
          password: passwordRef.current.value,
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          age: ageRef.current.value ? parseInt(ageRef.current.value) : undefined,
          gender: genderRef.current.value,
          skills: skillsRef.current.value 
            ? skillsRef.current.value.split(',').map(skill => skill.trim())
            : [],
          about: aboutRef.current.value,
          location: locationRef.current.value
        };

  
        Object.keys(userData).forEach(
          (key) => userData[key] === undefined && delete userData[key]
        );

        const res = await axios.post(
          `${baseApi}/signup`,
          userData,
          { withCredentials: true }
        );
        console.log("signupData",res.data)
        dispatch(addUser(res.data.data));
        navigate("/");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err?.response?.data?.error || err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 transition-all duration-300">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
            {isLogin ? "Login" : "Create Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="you@example.com"
                ref={emailRef}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter your password"
                ref={passwordRef}
              />
            </div>

            {/* Signup specific fields - conditionally rendered */}
            {!isLogin && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={50}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="John"
                      ref={firstNameRef}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      minLength={2}
                      maxLength={50}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Doe"
                      ref={lastNameRef}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      min={18}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="25"
                      ref={ageRef}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      ref={genderRef}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="React, Node, JavaScript"
                    ref={skillsRef}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    rows={3}
                    placeholder="Tell us about yourself"
                    ref={aboutRef}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="City, Country"
                    ref={locationRef}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm animate-fade-in p-2 bg-red-50 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isLogin ? "Logging in..." : "Creating account..."}
                </span>
              ) : (
                isLogin ? "Login" : "Sign Up"
              )}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600">
            {isLogin ? (
              <>
                New user?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign up now
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Login here
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;