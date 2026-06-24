import "./Header.css";
import "../Navigation/Navigation.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
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

    setCurrentUser(user);
    return true;
  };

  return (
    <>
      <header className="header header--default">
        <div className="header__nav">
          <Link to="/" className="header__title-link">
            <h1 className="header__title">NewsExplorer</h1>
          </Link>
          <div className="header__right">
            <Link to="/" className="navigation__link">
              Home
            </Link>
            {currentUser && (
              <Link to="/saved-news" className="navigation__link">
                Saved Articles
              </Link>
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
        </div>
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
        onRegisterSuccess={(data) => {
          handleRegisterSuccess(data);
          openLoginModal();
        }}
      />
    </>
  );
}

export default Header;
