import PropTypes from "prop-types";
import MovieGalleryItem from "./MovieGalleryItem/MovieGalleryItem";
import s from "./MovieGallery.module.css";

const MovieGallery = ({ movies, url, location }) => (
  <ul className={s.movieGallery}>
    {movies.map(({ id, title }) => (
      <li className={s.item} key={id}>
        <MovieGalleryItem id={id} title={title} url={url} location={location} />
      </li>
    ))}
  </ul>
);

export default MovieGallery;

MovieGallery.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
  url: PropTypes.string.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }),
};
