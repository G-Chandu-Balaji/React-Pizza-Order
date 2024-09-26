import React from "react";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loaader from "./Loaader";

function AppLayout() {
  const navigate = useNavigation();
  console.log(navigate);
  const isLoading = navigate.state === "loading";
  return (
    <div className="layout">
      {isLoading && <Loaader />}
      <Header />
      <main>
        <h1>content</h1>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
