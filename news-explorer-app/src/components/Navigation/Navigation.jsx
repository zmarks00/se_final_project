import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/" className="navigation__link">
        Home
      </Link>
      <Link to="/saved-news" className="navigation__link">
        Saved Articles
      </Link>
    </nav>
  );
}

export default Navigation;
