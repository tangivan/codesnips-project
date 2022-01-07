import User from "./User";
import Suggestions from "./Suggestions";
import { useContext } from "react";
import LoggedInUserContext from "../../context/logged-in-user";

const SideBar = () => {
  const { user: { docId = "", fullName, username, userId, following } = {} } =
    useContext(LoggedInUserContext);

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
};

export default SideBar;
