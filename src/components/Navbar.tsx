import { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const userContext = useContext(UserContext); // Access the user context

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const dropdownProfile = () => {
    return (
      <div className="absolute right-0 top-16 flex flex-col bg-white border border-gray-300 shadow-lg rounded-md p-2 z-50">
        <ul className="flex flex-col gap-2">
          <Link to={"/settings"}>
            <li className="hover:bg-orange-500 text-center py-2 px-4 rounded-md transition-colors duration-150">
              Settings
            </li>
          </Link>
          <Link to={"/our-objects"}>
            <li className="hover:bg-orange-500 text-center py-2 px-4 rounded-md transition-colors duration-150">
              My events and objects
            </li>
          </Link>
          <li
            onClick={() => {
              userContext?.logout();
              setIsDropdownVisible(false); 
            }}
            className="hover:bg-orange-500 text-center py-2 px-4 rounded-md transition-colors duration-150 cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </div>
    );
  };

  return (
    <nav className="relative w-full bg-gray-800 shadow-md z-50">
      <div className="flex justify-between items-center p-4 text-orange-500">
        <div className="flex items-center">
          <Link to={"/"}>
            <span className="text-3xl font-bold cursor-pointer hover:text-orange-300 transition-colors duration-150">
              Sport Event App
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-8 mr-4">
          {}
          <ul className="flex gap-6 text-[18px]">
            <Link to={"/"}>
              <li className="border-b border-transparent hover:bg-orange-600 duration-150 rounded-md text-white py-2 px-4 transition-all">
                Home
              </li>
            </Link>
            <Link to={"/events"}>
              <li className="border-b border-transparent hover:bg-orange-600 duration-150 rounded-md text-white py-2 px-4 transition-all">
                Events
              </li>
            </Link>
            <Link to={"/about"}>
              <li className="border-b border-transparent hover:bg-orange-600 duration-150 rounded-md text-white py-2 px-4 transition-all">
                About
              </li>
            </Link>
          </ul>

          {}
          <li
            onClick={() => setIsDropdownVisible((x) => !x)}
            ref={dropdownRef}
            className="flex items-center gap-2 hover:cursor-pointer relative"
          >
            {userContext?.user ? (
              <>
                <img
                  className="rounded-full object-cover w-8 h-8 border-2 border-orange-500"
                  src="https://www.imgonline.com.ua/examples/random-pixels-wallpaper-big.jpg"
                  alt="Profile"
                />
                <span className="text-[14px] text-white hover:text-orange-300 transition-colors duration-150">
                  {userContext.user.email}, {userContext.user.money}$
                </span>
              
              </>
            ) : (
              <Link to={"/register"} className="text-white hover:text-orange-300">
                Register
              </Link>
            )}
          </li>
        </div>
      </div>

      {isDropdownVisible && dropdownProfile()}
    </nav>
  );
};

export default Navbar;
