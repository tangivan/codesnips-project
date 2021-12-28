import PropTypes from "prop-types";

const Footer = ({ description, username }) => {
  return (
    <div className="p-4 pt-2 pb-0 mb-2">
      <span className="mr-1 font-bold">{username}</span>
      <span>{description}</span>
    </div>
  );
};

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Footer;
