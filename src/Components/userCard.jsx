/* eslint-disable no-undef */
import axios from 'axios';
import { baseApi } from '../utils/api';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../Redux/feedSlice';

//import { removeUserFromFeed } from '../Redux/feedSlice';
export const UserCard = ({ user }) => {
  const dispatch = useDispatch()
  const handleRequest = async (status, toUserId) => {
    
    try {
      const res = await axios.post(
        `${baseApi}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );
      
      console.log(res.data);
      dispatch(removeUserFromFeed(toUserId))
      // alert(`Request ${status}ed successfully!`);
      
    } catch (err) {
      console.log(err?.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center font-sans p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={user.photoUrl}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-56 object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-3 right-3 bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md">
            {user.age} yrs
          </div>
        </div>

        {/* User Info */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{user.about}</p>

          {/* Skills */}
          {user.skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {user.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handleRequest('interested', user._id)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg text-sm"
            >
              Accept
            </button>
            <button
              onClick={() => handleRequest('ignored', user._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
