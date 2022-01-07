import { useState, useEffect } from "react";
import { getSnippets } from "../services/firebase";

const useSnippets = (user) => {
  const [snippets, setSnippets] = useState(null);

  useEffect(() => {
    async function getFeedSnippets() {
      //does this uers follow ppl?
      if (user?.following?.length > 0) {
        const followedUserSnippets = await getSnippets(
          user.userId,
          user.following
        );
        // re-arrange snippets
        followedUserSnippets.sort((a, b) => b.dateCreated - a.dateCreated);
        setSnippets(followedUserSnippets);
      }
    }
    getFeedSnippets();
  }, [user.userId]);
  return { snippets };
};

export default useSnippets;
