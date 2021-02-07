import { lazy, Suspense, useEffect, useState } from "react";
import {
  Route,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { fetchMovieByID } from "../services/movieApiService";
import ErrorBox from "../components/Error/ErrorBox";
import Spiner from "../components/Spiner/Spiner";
import Movie from "../components/Movie/Movie";

const Cast = lazy(() =>
  import("./Cast" /* webpackChunkName: "cast-sub-view" */)
);
const Reviews = lazy(() =>
  import("./Reviews" /* webpackChunkName: "reviews-sub-view" */)
);

const MovieDetailsPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovie = async (movieId) => {
      setIsFetching(true);

      try {
        const movie = await fetchMovieByID(movieId);

        setMovie(movie);
        setIsFetching(false);
      } catch {
        setIsFetching(false);
        setError("Can't find movie!");
      }
    };

    getMovie(movieId);
  }, [movieId]);

  const onGoBack = () => history.push(location?.state?.from?.location ?? "/");

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={onGoBack}>
            Go back
          </button>
          <Movie
            title={movie.title}
            img={movie.poster_path}
            description={movie.overview}
            score={movie.vote_average}
            genres={movie.genres}
            url={url}
          />

          <Suspense fallback={<Spiner />}>
            <Route path={`${path}/cast`}>
              <Cast />
            </Route>
            <Route path={`${path}/reviews`}>
              <Reviews />
            </Route>
          </Suspense>
        </>
      )}

      {isFetching && <Spiner />}

      {error && <ErrorBox errorText={error} />}
    </>
  );
};

export default MovieDetailsPage;
