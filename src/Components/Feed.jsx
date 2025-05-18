import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseApi } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { addToFeed } from '../Redux/feedSlice';
import { UserCard } from './userCard';

const Feed = () => {
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [noMoreUsers, setNoMoreUsers] = useState(false);

  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.feed);

  const getFeed = async () => {
    setIsLoading(true);
    setError('');
    setNoMoreUsers(false);

    try {
      const res = await axios.get(`${baseApi}/user/feed`, {
        withCredentials: true,
      });
      
      if (res.data.user.length === 0) {
        setNoMoreUsers(true);
      } else {
        dispatch(addToFeed(res.data));
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleNext = () => {
    if (currentIndex + 1 >= userFeed?.user?.length) {
      // Reached end of current feed, try to fetch more
      getFeed();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const currentUser = userFeed?.user?.[currentIndex];

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      {error && (
        <p className="text-red-600 text-lg font-semibold animate-pulse">
          {error}
        </p>
      )}

      {isLoading ? (
        <div className="skeleton w-[95vw] max-w-md h-[85vh]"></div>
      ) : noMoreUsers || !currentUser ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No more users to show</h2>
          <button 
            onClick={getFeed}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="animate-slide-up">
          <UserCard user={currentUser} onNext={handleNext} />
        </div>
      )}
    </div>
  );
};

export default Feed;