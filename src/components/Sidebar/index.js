import useUser from "../../hooks/useUser";
import User from "./User";
import Suggestions from "./Suggestions";

const SideBar = () => {
  const {
    user: { docId, fullName, username, userId, following },
  } = useUser();

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
