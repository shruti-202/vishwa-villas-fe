import React from "react";
import Header from "../components/main/Header/Header.jsx";
import Footer from "../components/main/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default MainLayout;
