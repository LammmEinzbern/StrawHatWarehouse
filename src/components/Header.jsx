import React from "react";
import DropdownUser from "./nextui/DropdownUser";
import { useLocation } from "react-router-dom";
import Theme from "./Theme";

const Header = () => {
  const location = useLocation();
  const titleUrl = ["Dashboard"];

  return (
    <header className="h-20 shadow-lg flex items-center w-full px-4 md:px-8 bg-white dark:bg-gray-800">
      <h2 className="text-lg md:text-2xl" id="title"></h2>
      <div className="ml-auto flex gap-3">
        <Theme />
        <DropdownUser />
      </div>
    </header>
  );
};

export default Header;
