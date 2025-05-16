import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseApi } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { addToFeed } from '../Redux/feedSlice';
import { UserCard } from './userCard';

const Feed = () => {
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (userFeed?.user?.length > 0) return;

    try {
      const res = await axios.get(`${baseApi}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addToFeed(res.data));
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const currentUser = userFeed?.user?.[currentIndex];

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      {error && (
        <p className="text-red-600 text-lg font-semibold animate-pulse">
          {error}
        </p>
      )}

      {currentUser ? (
        <div className="animate-slide-up">
          <UserCard user={currentUser} onNext={handleNext} />
        </div>
      ) : (
        <div className="skeleton w-[95vw] max-w-md h-[85vh]"></div>
      )}
    </div>
  );
};

export default Feed;