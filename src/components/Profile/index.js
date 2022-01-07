import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./Header.js";
import Snippets from "./Snippets";
import { getUserSnippetsByUsername } from "../../services/firebase";

const Profile = ({ user }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    snippetsCollection: null,
    followerCount: 0,
  };

  const [{ profile, snippetsCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndSnippets() {
      const snippets = await getUserSnippetsByUsername(user.username);
      dispatch({
        profile: user,
        snippetsCollection: snippets,
        followerCount: user.followers.length,
      });
    }
    getProfileInfoAndSnippets();
  }, [user.username]);

  return (
    <>
      <Header
        snippetsCount={snippetsCollection ? snippetsCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Snippets snippets={snippetsCollection} />
    </>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};
export default Profile;
