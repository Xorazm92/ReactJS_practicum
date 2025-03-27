import React from "react";
import Navbar from "../../pages/navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../pages/footer";

const Layout: React.FC = () => {
  return (
    <div className="contiener">
      <Navbar />
      <main >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
