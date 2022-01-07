import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Feed from "../components/Feed";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/Sidebar";
import SnippetList from "../components/SnippetList";
import useUser from "../hooks/useUser";
import LoggedInUserContext from "../context/logged-in-user";

const Dashboard = ({ user: loggedInUser }) => {
  const { user } = useUser(loggedInUser.uid);
  useEffect(() => {
    document.title = "Codesnips";
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          {/* <SearchBar /> */}
          <Feed />
          <SideBar />
          {/* <SnippetList /> */}
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Dashboard;
