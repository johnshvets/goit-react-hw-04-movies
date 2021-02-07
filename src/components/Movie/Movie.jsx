import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import PageHeading from "../PageHeading/PageHeading";
import s from "./Movie.module.css";

const Movie = ({ title, img, description, score, genres, url }) => (
  <section>
    <PageHeading text={title} />
    <div className={s.movieWraper}>
      <div className={s.imgBox}>
        <img src={`https://image.tmdb.org/t/p/w500${img}`} />
      </div>
      <div className={s.descriptionBox}>
        <div>
          <p>User score: {score}</p>
        </div>
        <div>
          <b>Overview:</b>
          <p>{description}</p>
        </div>
        <div>
          <b>Genres:</b>
          <ul>
            {genres && genres.map(({ id, name }) => <li key={id}>{name}</li>)}
          </ul>
        </div>
      </div>
    </div>
    <div className={s.linkBox}>
      <p>Additional information:</p>

      <NavLink
        to={`${url}/cast`}
        className={s.link}
        activeClassName={s.activeLink}
      >
        Cast
      </NavLink>

      <NavLink
        to={`${url}/reviews`}
        className={s.link}
        activeClassName={s.activeLink}
      >
        Reviews
      </NavLink>
    </div>
  </section>
);

export default Movie;

Movie.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};
