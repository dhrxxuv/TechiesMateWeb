import axios from "axios";
import { baseApi } from "../utils/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../Redux/requestSlice";
import { motion } from "framer-motion";

const ConnectionRequest = () => {
  const dispatch = useDispatch();
  const { requests } = useSelector((store) => store.request || { requests: [] });
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${baseApi}/user/request`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log("Error fetching requests:", err?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestAction = async (requestId, status) => {
    try {
      await axios.post(
        `${baseApi}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      alert(`Failed to ${status} request`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-pink-500 border-b-indigo-500 border-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-500 opacity-20 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center max-w-lg border border-white/20"
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
          <h1 className="text-3xl font-bold text-white mb-3">No Requests</h1>
          <p className="text-pink-200 mb-6">You don’t have any pending requests right now.</p>
          <button className="bg-gradient-to-r from-pink-600 to-indigo-600 px-6 py-2 rounded-full text-white font-semibold hover:scale-105 transition-transform">
            Find People
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            Connection Requests
          </h1>
          <p className="text-xl text-white/80">Review and respond to pending connections</p>
        </motion.div>

        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-indigo-900">
          {requests.map((request, index) => (
            <motion.div
              key={request._id || index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[300px] bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-400 shadow-lg"
              >
                <img
                  src={request.fromUserId.photoUrl}
                  alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold text-white">
                  {request.fromUserId.firstName} {request.fromUserId.lastName}
                </h2>
                <p className="text-sm text-white/70 mt-1">{request.fromUserId.about}</p>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold transition-all"
                  onClick={() => handleRequestAction(request.fromUserId._id, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-semibold transition-all"
                  onClick={() => handleRequestAction(request.fromUserId._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectionRequest;
