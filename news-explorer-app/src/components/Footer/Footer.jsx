import "./Footer.css";
import { Link } from "react-router-dom";
import githubIcon from "../../assets/github.svg";
import linkedinIcon from "../../assets/LinkedIn.svg";

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
            {/*  <Link to="/saved-news" className="footer__link">
              TripleTen
            </Link> */}
          </nav>
          <div className="footer__social">
            <a
              href="https://www.tripleten.com"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              TripleTen
            </a>
            <a
              href="https://www.github.com"
              target="_blank"
              rel="noreferrer"
              className="footer__social-link"
            >
              <img src={githubIcon} alt="Github" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="footer__social-link"
            >
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
