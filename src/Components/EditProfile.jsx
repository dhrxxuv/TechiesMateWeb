import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/userSlice";
import { useNavigate } from "react-router";
import axios from "axios";
import { baseApi } from "../utils/api";
import { LiveUserCardEditing } from './LiveUserCardEditing'

export const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    about: "",

    photoUrl: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [isSkillsFocused, setIsSkillsFocused] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || "",
        gender: user.gender || "",
        about: user.about || "",
        photoUrl: user.photoUrl || "",
      
      });
      setSkills(user.skills || []);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (skill && skills.length < 20 && !skills.includes(skill)) {
      setSkills((prev) => [...prev, skill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (indexToRemove) => {
    setSkills((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleClearAllSkills = () => {
    setSkills([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    } else if (e.key === "Backspace" && !newSkill && skills.length > 0) {
      handleRemoveSkill(skills.length - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userData = {
        ...formData,
        age: formData.age ? parseInt(formData.age) : undefined,
        skills: skills,
      };

      Object.keys(userData).forEach(
        (key) => userData[key] === undefined && delete userData[key]
      );

      const response = await axios.patch(`${baseApi}/profile/edit`, userData, {
        withCredentials: true,
      });

      dispatch(addUser(response.user));
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/profile");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="flex-1 bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-6 sm:p-8 transition-all duration-300">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-amber-400 tracking-tight">
            Edit Your Profile
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-900/90 text-red-100 rounded-lg flex items-center gap-3 animate-fade-in">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label text-gray-300 font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  minLength={2}
                  maxLength={50}
                  className="input bg-gray-700/50 border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200"
                />
              </div>

              <div className="form-control">
                <label className="label text-gray-300 font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  minLength={2}
                  maxLength={50}
                  className="input bg-gray-700/50 border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200"
                />
              </div>


            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label text-gray-300 font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min={18}
                  max={100}
                  className="input bg-gray-700/50 border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200"
                />
              </div>

              <div className="form-control">
                <label className="label text-gray-300 font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="select bg-gray-700/50 border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label text-gray-300 font-medium">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                rows={4}
                className="textarea bg-gray-700/50 border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200"
              />
            </div>

            <div className="form-control">
              <label className="label text-gray-300 font-medium">Photo URL</label>
              <input
                type="text"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleInputChange}
                className="input bg-gray-700/50 border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200"
              />
            </div>

            <div className="form-control">
              <label className="label text-gray-300 font-medium flex justify-between">
                <span>Skills</span>
                <span className="text-xs text-gray-400">{skills.length}/20</span>
              </label>

              <div
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  isSkillsFocused
                    ? "border-amber-400 ring-2 ring-amber-400/30"
                    : "border-gray-600"
                } bg-gray-700/30 transition-all duration-200`}
              >
                <div className="flex flex-wrap gap-2 flex-1">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-outline border-amber-400 text-amber-400 hover:bg-amber-400/10 transition-colors duration-200"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className="ml-1 text-xs hover:text-amber-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsSkillsFocused(true)}
                    onBlur={() => setIsSkillsFocused(false)}
                    placeholder="Add skill"
                    className="bg-transparent text-gray-100 outline-none flex-1 min-w-[100px]"
                  />
                </div>
                {skills.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAllSkills}
                    className="text-xs text-amber-400 hover:text-amber-300 transition-colors duration-200"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            <div className="form-control mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="btn bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-500/30"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Section */}
        <div className="lg:w-96 bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-6 flex items-center justify-center transition-all duration-300">
          <LiveUserCardEditing user={{...formData, skills}} />
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in z-50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Profile saved successfully!</span>
        </div>
      )}
    </div>
  );
};