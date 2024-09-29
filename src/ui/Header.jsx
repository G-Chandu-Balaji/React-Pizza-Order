import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "./SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <div className="bg-yellow-400 uppercase px-4 sm:px-6 py-3 border-b border-stone-300">
      <header className="flex items-center justify-between">
        <Link to="/" className="tracking-widest">Fast React Pizza Co.</Link>
        <SearchOrder />
        <Username/>
      </header>
    </div>
  );
}

export default Header;
