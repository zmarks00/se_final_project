import "./NewsCard.css";

function NewsCard({
  title = "Everyone Needs a Special 'Sit Spot' in Nature",
  date = "November 4, 2020",
  text = 'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice is for both adults and children to find...',
  source = "Treehugger",
  image = "https://via.placeholder.com/400x200?text=News+Image",
  url = "https://example.com",
}) {
  return (
    <article className="news-card">
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
      <button
        type="button"
        className="news-card__bookmark"
        aria-label="Bookmark article"
      />
    </article>
  );
}

export default NewsCard;
