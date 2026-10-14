import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./NewsCard.css";

function NewsCard({
  article,
  title = article?.title || "Everyone Needs a Special 'Sit Spot' in Nature",
  date = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "November 4, 2020",
  text = article?.description ||
    article?.text ||
    'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice is for both adults and children to find...',
  source = article?.source?.name || article?.source || "Treehugger",
  image = article?.urlToImage ||
    article?.image ||
    "https://via.placeholder.com/400x200?text=News+Image",
  url = article?.url || "https://example.com",
  isBookmarked = false,
  onBookmarkToggle = () => {},
  isSavedView = false,
  onDelete = () => {},
  keyword = "",
}) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handleBookmarkClick = () => {
    onBookmarkToggle();
    setBookmarked((prev) => !prev);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <article className="news-card">
      {isSavedView && (
        <button
          type="button"
          className="news-card__delete"
          aria-label="Delete article"
          onClick={handleDeleteClick}
        />
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="news-card__link"
      >
        <img src={image} alt="News" className="news-card__image" />
        <div className="news-card__content">
          <p className="news-card__date">{date}</p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__text">{text}</p>
          <p className="news-card__source">{source}</p>
        </div>
      </a>
      {isSavedView && keyword && (
        <div className="news-card__keyword-tag">{keyword}</div>
      )}
      {!isSavedView && (
        <button
          type="button"
          className={`news-card__bookmark ${bookmarked ? "news-card__bookmark--marked" : ""}`}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark article"}
          onClick={handleBookmarkClick}
        />
      )}
    </article>
  );
}

NewsCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    publishedAt: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.string,
    source: PropTypes.oneOfType([
      PropTypes.shape({ name: PropTypes.string }),
      PropTypes.string,
    ]),
    urlToImage: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
  }),
  title: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  source: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  isBookmarked: PropTypes.bool,
  onBookmarkToggle: PropTypes.func,
  isSavedView: PropTypes.bool,
  onDelete: PropTypes.func,
  keyword: PropTypes.string,
};

export default NewsCard;
