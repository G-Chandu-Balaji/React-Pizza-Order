import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "./SearchOrder";

function Header() {
  return (
    <div>
      <header>
        <Link to="/">Fast React Pizza Co.</Link>
        <SearchOrder />
      </header>
    </div>
  );
}

export default Header;
