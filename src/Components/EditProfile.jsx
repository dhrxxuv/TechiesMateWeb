import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/userSlice";
import { useNavigate } from "react-router";
import axios from "axios";
import { baseApi } from "../utils/api";
import { LiveUserCardEditing } from './LiveUserCardEditing';

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

      dispatch(addUser(response.data?.user || response.data));
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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 transition-all duration-300">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            Edit Your Profile
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 animate-fade-in flex items-center gap-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  minLength={2}
                  maxLength={50}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  minLength={2}
                  maxLength={50}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min={18}
                  max={100}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
              <input
                type="text"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Skills</span>
                <span className="text-gray-500">{skills.length}/20</span>
              </label>
              <div className={`flex flex-wrap gap-2 p-3 rounded-lg border ${isSkillsFocused ? "border-gray-500 ring-2 ring-gray-300" : "border-gray-300"} bg-gray-50 transition-all duration-200`}>
                {skills.map((skill, index) => (
                  <div key={index} className="badge badge-outline border-gray-500 text-gray-700 gap-2">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="text-xs hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsSkillsFocused(true)}
                  onBlur={() => setIsSkillsFocused(false)}
                  placeholder="Add skill"
                  className="bg-transparent outline-none flex-1 min-w-[100px] text-gray-700"
                />
              </div>
              {skills.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllSkills}
                  className="text-sm text-red-500 hover:text-red-700 mt-2 self-end"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition-all duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
        <div className="lg:w-96 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex items-center justify-center">
          <LiveUserCardEditing user={{ ...formData, skills }} />
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="mt-16 fixed top-4 right-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg animate-slide-in flex items-center gap-2">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Profile saved successfully!</span>
        </div>
      )}
    </div>
  );
};
