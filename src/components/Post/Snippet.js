import PropTypes from "prop-types";
import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Snippet = ({ language, snippet }) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="relative px-4 mt-4">
      <CopyToClipboard text={snippet} onCopy={() => setIsCopied(true)}>
        {isCopied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer absolute top-0 right-5 fill-cyan-600 hover:fill-cyan-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer absolute top-0 right-5 fill-cyan-600 hover:fill-cyan-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
            />
          </svg>
        )}
      </CopyToClipboard>
      <SyntaxHighlighter
        language={language}
        style={vs2015}
        customStyle={{ borderRadius: "1rem" }}
        showLineNumbers={true}
        wrapLongLines={true}
      >
        {snippet}
      </SyntaxHighlighter>
    </div>
  );
};

Snippet.propTypes = {
  language: PropTypes.string.isRequired,
  snippet: PropTypes.string.isRequired,
  // description: PropTypes.string,
};
export default Snippet;
