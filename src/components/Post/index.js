import { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Snippet from "./Snippet";
import Actions from "./Actions";
import Footer from "./Footer";
import Comments from "./Comments";

const Post = ({ content }) => {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div className="rounded col-span-4 border bg-white border-gray-500 mb-8">
      <Header username={content.username} title={content.title} />
      <Snippet
        language={content.language}
        snippet={content.snippet}
        description={content.description}
      />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedSnippet={content.userLikedSnippet}
        handleFocus={handleFocus}
      />
      <Footer description={content.description} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    snippetId: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired,
    dateCreated: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired,
    userLikedSnippet: PropTypes.bool.isRequired,
    docId: PropTypes.string.isRequired,
  }),
};
export default Post;
