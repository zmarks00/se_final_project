import "./Navigation.css";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `navigation__link ${isActive ? "navigation__link_active" : ""}`.trim()
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/saved-news"
        className={({ isActive }) =>
          `navigation__link ${isActive ? "navigation__link_active" : ""}`.trim()
        }
      >
        Saved Articles
      </NavLink>
    </nav>
  );
}

export default Navigation;
