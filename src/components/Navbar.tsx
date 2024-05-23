import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-300 p-2">
      <div className="flex flex-col items-start space-y-0 text-zinc-600">
        <Link to={"/"}>
          <img src="/assets/756.jpg" alt="Logo" className="h-10 w-10 object-cover rounded-md" />
        </Link>
        <span className="text-sm -mb-1">Discover Your Team's</span>
        <span className="text-sm -mb-1">Playground</span>
        <span className="text-sm">Find Places to Play Together</span>
      </div>
      <ul className="flex items-cecnter space-x-4">
        <li>
          <Link to={"/calendar"}>
            <CalendarMonthIcon fontSize="small" />
          </Link>
        </li>
        <li>
          <Link to={"/chat"}>
            <ChatBubbleOutlineIcon fontSize="small" />
          </Link>
        </li>
        <li>
          <Link to={"/notifications"}>
            <NotificationsNoneIcon fontSize="small" />
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <span className="text-sm font-bold">Jan Maj</span>
          <span className="text-xs">Poland</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
