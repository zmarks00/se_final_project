import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!inputValue.trim()) {
      setError("Please enter a keyword");
      return;
    }

    onSearch(inputValue.trim());
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Enter topic"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit" className="search-form__button">
        Search
      </button>
      {error && <p className="search-form__error">{error}</p>}
    </form>
  );
}

export default SearchForm;
