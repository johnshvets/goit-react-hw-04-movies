import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import s from "./MovieGalleryItem.module.css";

const MovieGalleryItem = ({ id, title, url, location }) => (
  <Link
    to={{ pathname: `${url}/${id}`, state: { from: { location } } }}
    className={s.link}
  >
    <h2>{title}</h2>
  </Link>
);

export default MovieGalleryItem;

MovieGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }),
};
