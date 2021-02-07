import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ErrorBox from "../components/Error/ErrorBox";
import MovieGallery from "../components/MovieGallery/MovieGallery";
import PageHeading from "../components/PageHeading/PageHeading";
import Spiner from "../components/Spiner/Spiner";
import { fetchTrendingMovies } from "../services/movieApiService";

const HomePage = () => {
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      setIsFetching(true);

      try {
        const movies = await fetchTrendingMovies();

        if (movies.length === 0) {
          throw Error(`Can't find movies!`);
        }

        setMovies([...movies]);
        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
        setError(error);
      }
    };

    getMovies();
  }, []);

  return (
    <>
      <PageHeading text="Trending movies" />

      {movies && (
        <MovieGallery url="movies" movies={movies} location={location} />
      )}

      {isFetching && <Spiner />}

      {error && <ErrorBox errorText={error} />}
    </>
  );
};

export default HomePage;
