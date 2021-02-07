import { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import ErrorBox from "../components/Error/ErrorBox";
import MovieGallery from "../components/MovieGallery/MovieGallery";
import Searchbar from "../components/Searchbar/Searchbar";
import Spiner from "../components/Spiner/Spiner";
import { fetchMoviesByKeyWord } from "../services/movieApiService";

const MoviesPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();
  const [movieQuery, setMovieQuery] = useState(
    new URLSearchParams(location.search).get("query") ?? ""
  );
  const [movies, setMovies] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (movieQuery === "") {
      return;
    }

    const getMovies = async (query) => {
      try {
        setIsFetching(true);
        const movies = await fetchMoviesByKeyWord(query);

        if (movies.length === 0) {
          throw Error(`Can't find movies by '${movieQuery}' keyword!!`);
        }

        setMovies([...movies]);
        history.push({
          ...location,
          search: `query=${movieQuery}`,
        });
        setIsFetching(false);
      } catch ({ message }) {
        setIsFetching(false);
        setError(message);
      }
    };

    getMovies(movieQuery);
  }, [movieQuery]);

  const onSubmit = (movieQuery) => {
    setMovieQuery(movieQuery);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />

      {movies && <MovieGallery url={url} movies={movies} location={location} />}

      {isFetching && <Spiner />}

      {error && <ErrorBox errorText={error} />}
    </>
  );
};

export default MoviesPage;
