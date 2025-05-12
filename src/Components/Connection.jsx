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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br">
      <div className="max-w-[90vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-black sm:text-6xl lg:text-7xl tracking-tight">
            Your Network
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl">
            Connect with your professional circle
          </p>
        </motion.div>

        <div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-indigo-900">
          {connections.map((connection, index) => (
            <motion.div
              key={connection._id || index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="minDST-w-[300px] bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-white/50"
            >
              <div className="p-8">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-blue-500/50 shadow-lg cursor-pointer"
                  onClick={() =>
                    handleImageClick(connection.photoUrl || "/default-avatar.png")
                  }
                >
                  <img
                    src={connection.photoUrl || "/default-avatar.png"}
                    alt={`${connection.firstName} ${connection.lastName}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-black">
                    {connection.firstName} {connection.lastName}
                  </h2>
                  {connection.position && (
                    <p className="text-pink-200 mt-2">{connection.position}</p>
                  )}
                </div>
              </div>
              <div className="bg-white/5 px-6 py-4 flex justify-center">
                <button
                  className="bg-green-600 text-white px-8 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
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
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg border-2 border-pink-500/50"
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