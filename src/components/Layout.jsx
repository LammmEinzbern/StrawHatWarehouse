import React from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <main className="flex flex-col md:flex-row w-full min-h-screen dark:bg-gray-900">
      <SideBar />
      <div className="flex flex-col w-full md:w-4/5 ml-auto">
        <Header />
        <div className="flex-grow p-4">{children}</div>
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
