import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getSnippets, getUserByUserId } from "../services/firebase";

const useSnippets = () => {
  const [snippets, setSnippets] = useState(null);
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  useEffect(() => {
    async function getFeedSnippets() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserSnippets = [];

      //does this uers follow ppl?
      if (following.length > 0) {
        followedUserSnippets = await getSnippets(userId, following);
      }

      followedUserSnippets.sort((a, b) => b.dateCreated - a.dateCreated);
      setSnippets(followedUserSnippets);
    }
    getFeedSnippets();
  }, [userId]);
  return { snippets };
};

export default useSnippets;
