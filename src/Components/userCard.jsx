import axios from 'axios';
import { baseApi } from '../utils/api';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../Redux/feedSlice';
import { motion } from 'framer-motion';

export const UserCard = ({ user, onNext }) => {
  const dispatch = useDispatch();

  const handleRequest = async (status, toUserId) => {
    try {
      await axios.post(
        `${baseApi}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(toUserId));
      onNext();
    } catch (err) {
      console.error(err?.response?.data || err.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="relative w-[95vw] max-w-md h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10 pointer-events-none" />
      
      {/* User Image */}
      <div className="relative h-[65%] w-full overflow-hidden">
        <motion.img
          src={user.photoUrl || '/default-profile.jpg'}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* User Badge */}
        <motion.div 
          className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-lg font-medium shadow-lg z-20"
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex items-center space-x-2">
            <span className="font-bold">{user.firstName}</span>
            <span className="w-1 h-1 bg-white rounded-full" />
            <span>{user.age}</span>
          </div>
        </motion.div>
      </div>
      
      {/* User Info */}
      <div className="flex-1 p-6 flex flex-col">
        {/* About Section */}
        <motion.div 
          className="flex-1 overflow-y-auto"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-700 text-lg leading-relaxed line-clamp-4 hover:line-clamp-none transition-all duration-200">
            {user.about || "This user hasn't written a bio yet."}
          </p>

          {/* Skills */}
          {user.skills?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">SKILLS</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex justify-between mt-6 space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={() => handleRequest('ignored', user._id)}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
          >
            <span className="text-xl mr-2">✖</span>
            <span>Pass</span>
          </motion.button>
          
          <motion.button
            onClick={() => handleRequest('interested', user._id)}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            <span className="text-xl mr-2">❤</span>
            <span>Connect</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};