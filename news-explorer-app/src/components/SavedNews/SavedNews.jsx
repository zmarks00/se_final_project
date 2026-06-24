import NewsCard from "../NewsCard/NewsCard";
import "./SavedNews.css";

function SavedNews() {
  return (
    <main className="saved-news">
      <h1 className="saved-news__title">Saved Articles</h1>
      <p className="saved-news__subtitle">
        You haven't saved any articles yet.
      </p>
      <div className="saved-news__grid">
        {/* Placeholder for saved articles */}
        <NewsCard />
        <NewsCard />
      </div>
    </main>
  );
}

export default SavedNews;
