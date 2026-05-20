import "./Footer.css";
import { Link } from "react-router-dom";
import githubIcon from "../../assets/github.png";
import linkedinIcon from "../../assets/linked-in.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <Link to="/" className="footer__logo-link">
            <p> &copy; 2026 Supersite, Powered by News API</p>
          </Link>
        </div>
        <div className="footer__links">
          <nav className="footer__nav">
            <Link to="/" className="footer__link">
              Home
            </Link>
            <Link to="/saved-news" className="footer__link">
              TripleTen
            </Link>
          </nav>
          <div className="footer__social">
            <a href="#" className="footer__social-link">
              <img src={githubIcon} alt="Github" />
            </a>
            <a href="#" className="footer__social-link">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
      <p className="footer__copyright"></p>
    </footer>
  );
}

export default Footer;
