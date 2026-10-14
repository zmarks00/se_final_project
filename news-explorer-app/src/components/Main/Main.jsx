import PropTypes from "prop-types";
import SearchForm from "../SearchForm/SearchForm";
import "./Main.css";

function Main({ onSearch }) {
  return (
    <main className="main">
      <div className="main__hero">
        <h1 className="main__title">
          What&apos;s going on in <br />
          the world?
        </h1>
        <p className="main__description">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm onSearch={onSearch} />
      </div>
    </main>
  );
}

Main.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Main;
