import axios from "axios";
import { baseApi } from "../utils/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../Redux/connectionSlic";
import { motion, AnimatePresence } from "framer-motion";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.Connection || []);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${baseApi}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log("Error fetching connections:", err?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-transparent border-t-pink-500 border-b-indigo-500"></div>
          <div className="absolute inset-0 animate-pulse rounded-full h-16 w-16 bg-gradient-to-r from-pink-500 to-indigo-500 opacity-20"></div>
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center max-w-lg border border-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 mx-auto text-pink-300 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h1 className="text-3xl font-extrabold text-white mb-4">
            No Connections Yet
          </h1>
          <p className="text-pink-200 mb-8">
            Start connecting with people to see them here.
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
            Find People
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-100 to-pink-100">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900">Your Network</h1>
          <p className="mt-4 text-lg text-gray-600">
            Connect with your professional circle
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {connections.map((connection, index) => (
            <motion.div
              key={connection._id || index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition duration-300"
            >
              <div
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-400 shadow-md cursor-pointer"
                onClick={() =>
                  handleImageClick(connection.photoUrl || "/default-avatar.png")
                }
              >
                <img
                  src={connection.photoUrl || "/default-avatar.png"}
                  alt={`${connection.firstName} ${connection.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {connection.firstName} {connection.lastName}
                  </h2>
                  {connection.position && (
                    <p className="text-gray-500 mt-1">{connection.position}</p>
                  )}
                </div>
                <button
                  className="mt-4 w-max bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
                  onClick={() => {
                    alert("Buy Subscription to chat");
                  }}
                >
                  Message
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-pink-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={selectedImage}
                alt="Profile preview"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg border-2 "
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Connection;
