import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dropdownProfile = () =>{
    return(
      <div className="absolute right-10 top-8 mt-10 flex flex-col bg-white border-[1px] border-gray w-[126px] rounded-[15px] p-4">
        <ul className="flex flex-col gap-4">
          <Link to={""}>
          <li>
            Profile
          </li>
          </Link>
          <Link to={""}>
          <li className="border-b-[1px] border-gray">
            Settings
          </li>
          </Link>
          <Link to={""}>
          <li>
            Logout
          </li>
          </Link>
        </ul>
      </div>
    );
  }

  return (
    <nav className="relative w-[100%]">
      <div className="flex p-4 text-dark-text-color bg-dark-bg-color">
        <div className="flex items-center flex-1">
          <span className="text-3xl font-bold">Sport Event App</span>
        </div>
        <ul className="flex gap-8 mr-16 text-[18px]">
          <Link to={"/"}>
            <li className="my-4 border-b border-slate-700 hover:bg-dark-bg-color-hover duration-150 rounded">Home</li>
          </Link>
          <Link to={"events"}>
            <li className="my-4 border-b border-slate-700 hover:bg-dark-bg-color-hover duration-150 rounded">Events</li>
          </Link>
          <Link to={"ranking"}>
            <li className="my-4 border-b border-slate-700 hover:bg-dark-bg-color-hover duration-150 rounded">Ranking</li>
          </Link>
          <Link to={"about"}>
            <li className="my-4 border-b border-slate-700 hover:bg-dark-bg-color-hover duration-150 rounded">About</li>
          </Link>
          <li onClick={() => setIsDropdownVisible(x=>!x)} onBlur={() => setIsDropdownVisible(false)} className="flex items-center gap-2 my-4 hover:cursor-pointer">
            <img className="rounded-[12px] object-cover w-8 h-8" src="https://www.imgonline.com.ua/examples/random-pixels-wallpaper-big.jpg" />
            <span className="text-[14px]">Jan Maj</span>
          </li>
        </ul>
      </div>
      {isDropdownVisible && dropdownProfile()}
    </nav>
  );
};

export default Navbar;
function userRef() {
  throw new Error("Function not implemented.");
}

