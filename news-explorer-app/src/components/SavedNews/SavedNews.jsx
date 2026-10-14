import PropTypes from "prop-types";
import NewsCard from "../NewsCard/NewsCard";
import "./SavedNews.css";

function SavedNews({
  savedArticles = [],
  currentUser = null,
  onBookmarkToggle = () => {},
  lastSearchQuery = "",
}) {
  const getKeywords = () => {
    const keywords = new Set();
    savedArticles.forEach((article) => {
      const firstWord = article.title?.split(" ")[0];
      if (firstWord) {
        keywords.add(firstWord);
      }
    });
    return Array.from(keywords);
  };

  const keywords = getKeywords();
  const username = currentUser?.username || "User";

  return (
    <main className="saved-news">
      <div className="saved-news__text-container">
        <p className="saved-news__subtitle">Saved articles</p>
        <h1 className="saved-news__title">
          {username}, you have {savedArticles.length} saved article
          {savedArticles.length !== 1 ? "s" : ""}
        </h1>
        {savedArticles.length > 0 && keywords.length > 0 && (
          <p className="saved-news__keywords">
            By keywords: {keywords.join(", ")}
          </p>
        )}
      </div>
      {savedArticles.length > 0 && (
        <div className="saved-news__grid">
          {savedArticles.map((article, index) => (
            <NewsCard
              key={article.url || `${article.title}-${index}`}
              article={article}
              isBookmarked
              isSavedView
              keyword={article.topic || lastSearchQuery}
              onBookmarkToggle={() => onBookmarkToggle(article)}
              onDelete={() => onBookmarkToggle(article)}
            />
          ))}
        </div>
      )}
    </main>
  );
}

SavedNews.propTypes = {
  savedArticles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
      publishedAt: PropTypes.string,
      description: PropTypes.string,
      text: PropTypes.string,
      source: PropTypes.oneOfType([
        PropTypes.shape({ name: PropTypes.string }),
        PropTypes.string,
      ]),
      urlToImage: PropTypes.string,
      image: PropTypes.string,
    }),
  ),
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
  }),
  onBookmarkToggle: PropTypes.func,
  lastSearchQuery: PropTypes.string,
};

export default SavedNews;
