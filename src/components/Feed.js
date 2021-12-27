import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useSnippets from "../hooks/useSnippets";
import Post from "./Post";

const Feed = () => {
  const { snippets } = useSnippets();
  console.log("snippets", snippets);
  return (
    <div className="container col-span-2">
      {!snippets ? (
        <>
          <Skeleton count={4} width={640} height={500} className="mb-5" />
        </>
      ) : snippets?.length > 0 ? (
        snippets.map((content) => (
          <Post key={content.docId} content={content} />
        ))
      ) : (
        <p className="text-center text-2xl">Follow people to see snippets</p>
      )}
    </div>
  );
};

export default Feed;
