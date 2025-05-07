export const LiveUserCardEditing = ({ user }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative h-48 sm:h-56 md:h-64">
        <img
          src={user.photoUrl || "https://placehold.co/400"}
          alt={`${user.firstName} ${user.lastName}'s profile`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent"></div>
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <div className="badge bg-green-500 text-white text-xs sm:text-sm py-1 px-2 sm:py-1.5 sm:px-3">
            <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {user.lastActive || "Recently active"}
          </div>
        </div>
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
          <div className="badge bg-gray-700 text-white text-xs sm:text-sm py-1 px-2 sm:py-1.5 sm:px-3">
            <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
            </svg>
            {user.age || "25"} yrs
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between flex-col sm:flex-row gap-3 sm:gap-0">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
              {user.firstName} {user.lastName}
              {user.isVerified && (
                <div className="inline-block" title="Verified profile">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 transition-colors duration-200 hover:text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </h2>
            {/* <div className="flex items-center mt-1 text-gray-600">
              <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs sm:text-sm">{user.location || "No location set"}</span>
            </div> */}
          </div>
          <div className={`badge ${user.gender === "male" ? "bg-blue-500" : "bg-pink-500"} text-white text-xs sm:text-sm py-1 px-2 sm:py-1.5 sm:px-3 transition-colors duration-200 hover:bg-opacity-80`}>
            {user.gender === "male" ? (
              <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            ) : (
              <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
            {user.gender || "Unknown"}
          </div>
        </div>

        <div className="mt-3">
          <p className={`text-xs sm:text-sm text-gray-600 ${user.about?.length > 100 ? "line-clamp-3" : ""} transition-all duration-200 hover:line-clamp-none`}>
            {user.about || "No description available."}
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-medium text-xs sm:text-sm text-gray-700 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills?.length > 0 ? (
              user.skills.map((skill, index) => (
                <div
                  key={index}
                  className="badge badge-outline border-gray-500 text-gray-700 text-xs sm:text-sm py-1 px-2 sm:py-1.5 sm:px-3 transition-colors duration-200 hover:bg-gray-100"
                >
                  {skill}
                </div>
              ))
            ) : (
              <span className="text-xs sm:text-sm text-gray-500">No skills added yet</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};