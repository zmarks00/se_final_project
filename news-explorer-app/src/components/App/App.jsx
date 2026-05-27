import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const location = useLocation();

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError("");
    setArticles([]);
    setHasSearched(true);
    setVisibleCount(3);

    try {
      const { fetchArticles } = await import("../../utils/newsApi.js");
      const data = await fetchArticles(query);

      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
      } else {
        setError("Nothing Found");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(
        "Sorry, something went wrong during the request. Please try again later.",
      );
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  // Reset articles when navigating away from home
  useEffect(() => {
    if (location.pathname !== "/") {
      setArticles([]);
      setHasSearched(false);
      setError("");
      setVisibleCount(3);
    }
  }, [location.pathname]);

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main onSearch={handleSearch} />
              {hasSearched && (
                <section className="search-results">
                  {isLoading && <Preloader />}
                  {error && !isLoading && (
                    <p className="search-results__error">{error}</p>
                  )}
                  {visibleArticles.length > 0 && !isLoading && (
                    <div className="search-results__articles">
                      {visibleArticles.map((article, index) => (
                        <article key={index} className="news-card">
                          <img
                            src={
                              article.urlToImage ||
                              "https://via.placeholder.com/400x200?text=No+Image"
                            }
                            alt={article.title}
                            className="news-card__image"
                          />
                          <div className="news-card__content">
                            <p className="news-card__date">
                              {new Date(article.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </p>
                            <h3 className="news-card__title">
                              {article.title}
                            </h3>
                            <p className="news-card__text">
                              {article.description}
                            </p>
                            <p className="news-card__source">
                              {article.source.name}
                            </p>
                          </div>
                          <button
                            type="button"
                            className="news-card__bookmark"
                            aria-label="Bookmark article"
                          />
                        </article>
                      ))}
                    </div>
                  )}
                  {hasMore && !isLoading && (
                    <div className="search-results__show-more-wrapper">
                      <button
                        className="search-results__show-more"
                        onClick={handleShowMore}
                      >
                        Show more
                      </button>
                    </div>
                  )}
                </section>
              )}
              <About />
            </>
          }
        />
        <Route path="/saved-news" element={<SavedNews />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
