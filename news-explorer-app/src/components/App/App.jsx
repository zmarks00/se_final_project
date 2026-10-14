import PropTypes from "prop-types";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import About from "../About/About";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import "./App.css";

function PageLayout({ children, currentUser, onUserChange }) {
  return (
    <>
      <Header currentUser={currentUser} onUserChange={onUserChange} />
      {children}
      <Footer />
    </>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
  }),
  onUserChange: PropTypes.func,
};

function App() {
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentUser, setCurrentUser] = useState(null);
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const location = useLocation();

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError("");
    setArticles([]);
    setHasSearched(true);
    setVisibleCount(3);
    setLastSearchQuery(query);

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

  const handleToggleSaveArticle = (article) => {
    setSavedArticles((prev) => {
      const articleId = article.url || article.title;
      const isAlreadySaved = prev.some(
        (savedArticle) =>
          (savedArticle.url || savedArticle.title) === articleId,
      );

      if (isAlreadySaved) {
        return prev.filter(
          (savedArticle) =>
            (savedArticle.url || savedArticle.title) !== articleId,
        );
      }

      return [...prev, { ...article, topic: lastSearchQuery }];
    });
  };

  const isArticleSaved = (article) => {
    const articleId = article.url || article.title;
    return savedArticles.some(
      (savedArticle) => (savedArticle.url || savedArticle.title) === articleId,
    );
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
      <Routes>
        <Route
          path="/"
          element={
            <PageLayout currentUser={currentUser} onUserChange={setCurrentUser}>
              <>
                <Main onSearch={handleSearch} />
                {hasSearched && (
                  <section className="search-results">
                    {isLoading && <Preloader />}
                    {error && !isLoading && (
                      <p className="search-results__error">{error}</p>
                    )}
                    {visibleArticles.length > 0 && !isLoading && (
                      <>
                        <p className="search-results__text">Search results</p>
                        <div className="search-results__articles">
                          {visibleArticles.map((article, index) => (
                            <NewsCard
                              key={article.url || `${article.title}-${index}`}
                              article={article}
                              isBookmarked={isArticleSaved(article)}
                              onBookmarkToggle={() =>
                                handleToggleSaveArticle(article)
                              }
                            />
                          ))}
                        </div>
                      </>
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
            </PageLayout>
          }
        />
        <Route
          path="/saved-news"
          element={
            <PageLayout currentUser={currentUser} onUserChange={setCurrentUser}>
              <SavedNews
                savedArticles={savedArticles}
                currentUser={currentUser}
                onBookmarkToggle={handleToggleSaveArticle}
                lastSearchQuery={lastSearchQuery}
              />
            </PageLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
