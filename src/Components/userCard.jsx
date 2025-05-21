import axios from 'axios';
import { baseApi } from '../utils/api';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../Redux/feedSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const UserCard = ({ user, onNext }) => {
  const dispatch = useDispatch();
  const [isExiting, setIsExiting] = useState(false);

  const handleRequest = async (status, toUserId) => {
    try {
      setIsExiting(true);
      await axios.post(
        `${baseApi}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );
      
      // Immediate visual feedback
      dispatch(removeUserFromFeed(toUserId));
      
      // Quick transition to next card
      setTimeout(() => {
        onNext();
        setIsExiting(false);
      }, 200); // Reduced from 800ms to 200ms for faster transition
      
    } catch (err) {
      console.error(err?.response?.data || err.message);
      setIsExiting(false);
    }
  };

  return (
    <AnimatePresence mode='wait'>
      {!isExiting && (
        <motion.div
          key={user._id}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            scale: 0.9,
            x: window.innerWidth * 0.5,
            transition: { duration: 0.2 } 
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 300,
            damping: 20,
            duration: 0.3 
          }}
          className="
            relative 
            w-full 
            max-w-md 
            h-[85vh] 
            bg-white 
            rounded-3xl 
            shadow-2xl 
            overflow-hidden 
            flex 
            flex-col 
            border 
            border-gray-100 
            mx-auto 
            sm:w-[95vw]
            cursor-pointer
            transform
            transition-transform
            duration-300
            hover:scale-[1.02]
            hover:shadow-[0_20px_50px_rgba(139,92,246,0.3)]
            sm:h-[80vh]
            xs:max-w-[95vw]
            xs:h-[75vh]
          "
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10 pointer-events-none" />

          {/* User Image */}
          <div className="relative h-[65%] w-full overflow-hidden">
            <motion.img
              src={user.photoUrl || '/default-profile.jpg'}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Badge with Name, Age, Gender */}
            <motion.div
              className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-lg font-medium shadow-lg z-20"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center space-x-2">
                <span className="font-bold">{user.firstName}</span>
                <span className="text-sm opacity-80">({user.gender || 'Other'})</span>
                <span className="w-1 h-1 bg-white rounded-full" />
                <span>{user.age}</span>
              </div>
            </motion.div>
          </div>

          {/* Info Section */}
          <div className="flex-1 p-5 sm:p-6 flex flex-col">
            {/* About */}
            <motion.div
              className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed line-clamp-4 hover:line-clamp-none transition-all duration-200">
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
                        transition={{ delay: 0.05 * idx }}
                        className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex justify-between mt-6 space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                onClick={() => handleRequest('ignored', user._id)}
                whileTap={{ scale: 0.9 }}
                className="flex-1 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
              >
                <span className="text-xl mr-2">✖</span>
                <span>Pass</span>
              </motion.button>

              <motion.button
                onClick={() => handleRequest('interested', user._id)}
                whileTap={{ scale: 0.9 }}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <span className="text-xl mr-2">❤</span>
                <span>Connect</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
