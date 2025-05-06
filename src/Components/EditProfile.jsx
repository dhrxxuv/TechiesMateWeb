import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/userSlice";
import { useNavigate } from "react-router";
import axios from "axios";
import { baseApi } from "../utils/api";

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

      console.log(response)

      dispatch(addUser(response.user));
      navigate("/profile");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 p-6 sm:p-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-amber-400">
          Edit Your Profile
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-900/80 text-red-100 rounded-lg flex items-center gap-3">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label text-gray-300">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                minLength={2}
                maxLength={50}
                className="input bg-gray-700 border-gray-600 text-gray-100 rounded-lg"
              />
            </div>

            <div className="form-control">
              <label className="label text-gray-300">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                minLength={2}
                maxLength={50}
                className="input bg-gray-700 border-gray-600 text-gray-100 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label text-gray-300">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min={18}
                max={100}
                className="input bg-gray-700 border-gray-600 text-gray-100 rounded-lg"
              />
            </div>

            <div className="form-control">
              <label className="label text-gray-300">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="select bg-gray-700 border-gray-600 text-gray-100 rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label text-gray-300">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              rows={4}
              className="textarea bg-gray-700 border-gray-600 text-gray-100 rounded-lg"
            />
          </div>

          <div className="form-control">
            <label className="label text-gray-300">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleInputChange}
              className="input bg-gray-700 border-gray-600 text-gray-100 rounded-lg"
            />
          </div>

          <div className="form-control">
            <label className="label text-gray-300 flex justify-between">
              <span>Skills</span>
              <span className="text-xs text-gray-400">{skills.length}/20</span>
            </label>

            <div
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                isSkillsFocused
                  ? "border-amber-400 ring-2 ring-amber-400/50"
                  : "border-gray-600"
              } bg-gray-700/50`}
            >
              <div className="flex flex-wrap gap-2 flex-1">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-outline border-amber-400 text-amber-400"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="ml-1 text-xs"
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
                  className="bg-transparent text-gray-100 outline-none"
                />
              </div>
              {skills.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllSkills}
                  className="text-xs text-amber-400 hover:text-amber-300"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          <div className="form-control">
            <button
              type="submit"
              disabled={isLoading}
              className="btn bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-lg transition-all"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
