import axios from "axios";
import { baseApi } from "../utils/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../Redux/connectionSlic";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router"; // fixed import

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
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl p-10 max-w-lg text-center border border-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 mx-auto text-blue-400 mb-6"
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
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">No Connections Yet</h1>
          <p className="text-gray-500 mb-6">Start connecting with people to see them here.</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition">
            Find People
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Your Network</h1>
          <p className="mt-3 text-gray-500">Connect with your professional circle</p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {connections.map((connection, index) => (
            <motion.div
              key={connection._id || index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col sm:flex-row items-center sm:items-start bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div
                className="w-28 h-28 flex-shrink-0 rounded-full overflow-hidden border-4 border-blue-400 shadow-md cursor-pointer"
                onClick={() => handleImageClick(connection.photoUrl || "/default-avatar.png")}
              >
                <img
                  src={connection.photoUrl || "/default-avatar.png"}
                  alt={`${connection.firstName} ${connection.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="sm:ml-6 mt-4 sm:mt-0 flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-semibold text-gray-800 truncate max-w-xs">
                    {connection.firstName} {connection.lastName}
                  </h2>
                  {connection.position && (
                    <p className="text-gray-500 text-sm mt-1">{connection.position}</p>
                  )}
                </div>
                <Link to={`/chat/${connection._id}`} className="mt-4 sm:mt-0 sm:ml-auto">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full transition shadow-md"
                    onClick={() => alert("Buy Subscription to chat")}
                  >
                    Message
                  </button>
                </Link>
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
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-red-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={selectedImage}
                alt="Profile preview"
                className="w-full max-h-[80vh] object-contain rounded-lg border"
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
