import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function Header(props) {
  const { branding } = props;
  return (
    <div>
      {/* <h1>Contact List</h1> */}
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {branding}
          </Link>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="fa fa-home" /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact/add" className="nav-link">
                  <i className="fa fa-plus" /> Add Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  <i className="fa fa-question" /> About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
Header.defaultProps = {
  branding: "Contact List"
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
};
export default Header;
