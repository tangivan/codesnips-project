import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Header = ({ username }) => {
  return (
    <div className="flex border-b border-gray-500 h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center"></Link>
        <img
          src={`/images/avatars/${username}.png`}
          alt="snippet"
          className="rounded-full h-8 w-8 flex mr-3"
        />
        <p className="font-bold">{username}</p>
      </div>
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Header;
