import React from "react";
import { Link, useNavigate } from "react-router-dom";

function TopNavigationBar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1  items-center">
        <Link
          to="/home"
          className="flex items-center justify-center btn btn-ghost normal-case font-light heading3 text-xl"
        >
          <div>
            <svg
              className="m-auto inline -mt-1 relative -left-2"
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 16.1948V13.3409M8.371 1.78253L2.7115 5.77801C1.7665 6.44392 1 7.86136 1 8.93633V15.9855C1 18.1925 2.9845 20 5.4205 20H17.5795C20.0155 20 22 18.1925 22 15.995V9.06952C22 7.91844 21.1495 6.44392 20.11 5.78752L13.621 1.66837C12.151 0.736093 9.7885 0.783659 8.371 1.78253Z"
                // Change stroke value to make a change in color
                stroke="#0162B2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          Home
        </Link>
      </div>
      <div className="flex-1 items-start">
        <input
          type="text"
          placeholder="Search"
          className="input input-ghost w-96 h-8"
        />
      </div>


      <div className="flex-none">
        {/* Existing code for dropdown menu */}
        <div className="dropdown dropdown-end">
          {/* Existing code for avatar */}
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7jIb4sn5nnrQxGV1Q35ylE4fpxeTrnaGJQw&usqp=CAU" alt="Avatar" />
            </div>
          </label>
          {/* Existing code for dropdown menu */}
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
            <li>
            <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopNavigationBar;
