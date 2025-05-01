export const NavBar = () => {
    return (
      <div className="w-full fixed top-0 left-0 z-50 bg-base-300 shadow-sm px-4">
        <div className="navbar flex justify-between w-full">
          {/* Left - TechiesMate */}
          <div className="flex items-center">
            <a className="btn btn-ghost text-xl px-0">TechiesMate</a>
          </div>
  
          {/* Right - Dropdown */}
          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User profile"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  