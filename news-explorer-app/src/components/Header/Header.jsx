import "./Header.css";
import "../Navigation/Navigation.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

function Header({ currentUser = null, onUserChange = () => {} }) {
  const location = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [users, setUsers] = useState([
    {
      email: "taken@example.com",
      username: "Example User",
      password: "password123",
    },
  ]);

  const openRegisterModal = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const openLoginModal = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleRegisterSuccess = ({ email, username, password }) => {
    setUsers((prev) => [
      ...prev,
      { email: email.toLowerCase(), username, password },
    ]);
  };

  const handleLogin = ({ email, password }) => {
    const normalizedEmail = email.toLowerCase();
    const user = users.find((userEntry) => userEntry.email === normalizedEmail);

    if (!user) {
      return false;
    }

    if (user.password !== password) {
      return false;
    }

    onUserChange(user);
    return true;
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const headerClass =
    location.pathname === "/saved-news"
      ? "header header--dark"
      : "header header--default";

  return (
    <>
      <header className={headerClass}>
        <div className="header__nav">
          <Link to="/" className="header__title-link">
            <h1 className="header__title">NewsExplorer</h1>
          </Link>
          <div className="header__right">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `navigation__link ${isActive ? "navigation__link_active" : ""}`.trim()
              }
            >
              Home
            </NavLink>
            {currentUser && (
              <NavLink
                to="/saved-news"
                className={({ isActive }) =>
                  `navigation__link ${isActive ? "navigation__link_active" : ""}`.trim()
                }
              >
                Saved articles
              </NavLink>
            )}
            {currentUser ? (
              <span className="header__signup">{currentUser.username}</span>
            ) : (
              <button
                className="header__signup"
                onClick={() => setIsLoginOpen(true)}
              >
                Sign in
              </button>
            )}
          </div>
          <button
            type="button"
            className="header__menu-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        {isMenuOpen && (
          <nav className="header__mobile-menu">
            <NavLink to="/" end className="header__mobile-link">
              Home
            </NavLink>
            {currentUser && (
              <NavLink to="/saved-news" className="header__mobile-link">
                Saved articles
              </NavLink>
            )}
            {currentUser ? (
              <span className="header__mobile-user">
                {currentUser.username}
              </span>
            ) : (
              <button
                type="button"
                className="header__mobile-signup"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsLoginOpen(true);
                }}
              >
                Sign in
              </button>
            )}
          </nav>
        )}
      </header>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenRegister={openRegisterModal}
        onLogin={handleLogin}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSignIn={openLoginModal}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </>
  );
}

Header.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
  }),
  onUserChange: PropTypes.func,
};

export default Header;
