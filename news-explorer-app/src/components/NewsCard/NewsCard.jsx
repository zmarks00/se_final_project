import "./NewsCard.css";

function NewsCard() {
  return (
    <article className="news-card">
      <img
        src="https://via.placeholder.com/400x200?text=News+Image"
        alt="News"
        className="news-card__image"
      />
      <div className="news-card__content">
        <p className="news-card__date">November 4, 2020</p>
        <h3 className="news-card__title">
          Everyone Needs a Special 'Sit Spot' in Nature
        </h3>
        <p className="news-card__text">
          Ever since I read Richard Louv's influential book, "Last Child in the
          Woods," the idea of having a special "sit spot" has stuck with me.
          This advice, which Louv attributes to nature educator Jon Young, is
          for both adults and children to find...
        </p>
        <p className="news-card__source">Treehugger</p>
      </div>
      <button className="news-card__bookmark">Bookmark</button>
    </article>
  );
}

export default NewsCard;
