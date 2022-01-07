import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoggedInUserContext from "../context/logged-in-user";
import useSnippets from "../hooks/useSnippets";
import Post from "./Post";

const Feed = () => {
  const { user } = useContext(LoggedInUserContext);
  const { snippets } = useSnippets(user);
  return (
    <div className="container col-span-2">
      {!snippets ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : (
        snippets.map((content) => (
          <Post key={content.docId} content={content} />
        ))
      )}
    </div>
  );
};

export default Feed;
