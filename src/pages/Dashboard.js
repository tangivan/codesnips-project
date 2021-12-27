import React, { useState, useEffect } from "react";
import Feed from "../components/Feed";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/Sidebar";
import SnippetList from "../components/SnippetList";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Codesnips";
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        {/* <SearchBar /> */}
        <Feed />
        <SideBar />
        {/* <SnippetList /> */}
      </div>
    </div>
  );
};

export default Dashboard;
