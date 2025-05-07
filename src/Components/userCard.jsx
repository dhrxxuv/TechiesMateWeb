/* eslint-disable no-undef */
export const UserCard = ({ user }) => {
  return (
    <div className="flex justify-center font-sans p-2 sm:p-4">
      <div className="w-full max-w-[22rem] sm:max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-gray-300 group">
        {/* Profile header with enhanced interaction */}
        <div className="relative overflow-hidden">
          <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
            <img
              src={user.photoUrl || "https://imgs.search.brave.com/GkAIuY4uQSRlbLRd1mseDZNRj6Bx_rQEz2b-y_8gaf8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzJmLzE1/L2YyLzJmMTVmMmU4/YzY4OGIzMTIwZDNk/MjY0NjdiMDYzMzBj/LmpwZw"}
              alt={`${user.firstName} ${user.lastName}'s profile`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:from-gray-900/90 group-hover:via-gray-900/50 transition-all duration-500"></div>
          </div>

          {/* Floating information badges */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex space-x-2">
            <div className="bg-green-500 text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
              <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {user.lastActive || 'Recently'}
            </div>
          </div>

          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center space-x-2">
            <div className="bg-gray-700 text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full shadow-md transition-transform duration-300 group-hover:scale-105">
              <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
              {user.age || '25'} yrs
            </div>
          </div>
        </div>

        <div className="px-4 py-4 sm:px-6 sm:py-5">
          {/* Name section with verification badge */}
          <div className="flex items-center justify-between flex-col sm:flex-row gap-3 sm:gap-0">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 uppercase transition-all duration-300 group-hover:text-gray-900">
                {user.firstName} {user.lastName}
              </h2>
              {user.isVerified && (
                <span className="text-blue-500 transition-colors duration-200 hover:text-blue-600" title="Verified profile">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
            <span className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full transition-colors duration-300 flex items-center ${
              user.gender?.toLowerCase() === 'male'
                ? 'bg-blue-100 text-blue-800 group-hover:bg-blue-200'
                : 'bg-pink-100 text-pink-800 group-hover:bg-pink-200'
            }`}>
              {user.gender === 'male' ? (
                <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ) : (
                <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
              {user.gender || 'Unknown'}
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-center text-gray-600">
              <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs sm:text-sm">{user.location || 'Location not specified'}</span>
            </div>
            <p className={`mt-2 text-xs sm:text-sm text-gray-600 transition-all duration-500 ${user.about?.length > 100 ? 'line-clamp-3 group-hover:line-clamp-none' : ''}`}>
              {user.about || "No description available."}
            </p>
          </div>

          <div className="mt-4 sm:mt-5 flex justify-between items-center gap-3">
            <button
              className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all duration-300 group-hover:scale-110"
              title="Not interested"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium text-sm sm:text-base hover:from-gray-800 hover:to-gray-950 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};