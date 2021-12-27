import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Image = ({ language, snippet, description }) => {
  console.log(snippet);
  const myCode = `const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  }`;
  return (
    // <pre className="flex justify-center bg-gray-800 shadow-xl">
    //   <code className="text-sm text-white">{snippet}</code>
    // </pre>
    <SyntaxHighlighter language={language} style={vs2015}>
      {snippet}
    </SyntaxHighlighter>
  );
};

Image.propTypes = {
  language: PropTypes.string.isRequired,
  snippet: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default Image;
