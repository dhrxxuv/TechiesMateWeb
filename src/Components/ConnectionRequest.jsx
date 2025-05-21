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

  // Using shimmer and CSS styles from Connection component
  const shimmerBG = "bg-gray-50";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (requests.length === 0) {
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
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">No Requests</h1>
          <p className="text-gray-500 mb-6">You don’t have any pending connection requests.</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition">
            Find People
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
            Connection Requests
          </h1>
          <p className="text-gray-500 text-lg">Review and respond to connection requests</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {requests.map((request, index) => (
            <motion.div
              key={request._id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-400 shadow-md">
                <img
                  src={request.fromUserId.photoUrl}
                  alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 w-full">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {request.fromUserId.firstName} {request.fromUserId.lastName}
                </h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {request.fromUserId.about}
                </p>
              </div>

              <div className="mt-5 flex gap-3 flex-wrap justify-center w-full">
                <button
                  onClick={() => handleRequestAction(request.fromUserId._id, "accepted")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRequestAction(request.fromUserId._id, "rejected")}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition"
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
