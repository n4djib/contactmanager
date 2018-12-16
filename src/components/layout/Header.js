import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

export default function Header(props) {
    const {branding} = props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-success mb-3 py-0">
        <div className="container">
            <a href="/" className="navbar-brand">{branding}</a>
        </div>
        <div>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        <i className="fas fa-home">Home</i>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact/add" className="nav-link">
                        <i className="fas fa-plus">Add</i>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">
                        <i className="fas fa-question">About</i>
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
  )
}

Header.defaultProps = {
    branding: 'My App'
}

Header.propTypes = {
    branding: PropTypes.string.isRequired
}

// const headingStyle = {
//     color: 'green', 
//     fontSize: '40px'
// }
