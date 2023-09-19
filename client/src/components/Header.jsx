import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex  justify-between mx-auto p-3 max-w-6xl">
        <Link to={"/"}>
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-3">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"about/"}>
            <li>About</li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? <img className='rounded-full w-7 object-cover' src={currentUser.profilePicture} alt="profile" /> :
            <li>Sign In</li>}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
