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
    <div className="grid  grid-rows-[auto_1fr_auto] h-screen">
      {isLoading && <Loaader />}
      
      <Header />
      <div className="overflow-scroll">
      <main className=" max-w-3xl mx-auto " >
         <Outlet />
      </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
