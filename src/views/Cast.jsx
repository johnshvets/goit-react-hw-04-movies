import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdditionalInfoItem from "../components/AdditionalInfoItem/AdditionalInfoItem";
import ErrorBox from "../components/Error/ErrorBox";
import Spiner from "../components/Spiner/Spiner";
import { fetchCastByMovieID } from "../services/movieApiService";

const Cast = () => {
  const { movieId } = useParams();

  const [actors, setActors] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async (movieId) => {
      setIsFetching(true);

      try {
        const actors = await fetchCastByMovieID(movieId);

        if (actors.length === 0) {
          throw Error("Can't find cast!");
        }

        setActors(actors);
        setIsFetching(false);
      } catch ({ message }) {
        setIsFetching(false);
        setError(message);
      }
    };

    getCast(movieId);
  }, [movieId]);

  return (
    <>
      {actors && (
        <ul>
          {actors.map(({ id, character, name, profile_path }) => (
            <li key={id}>
              <AdditionalInfoItem
                img={profile_path}
                name={name}
                description="Character:"
                content={character}
              />
            </li>
          ))}
        </ul>
      )}

      {isFetching && <Spiner />}

      {error && <ErrorBox errorText={error} />}
    </>
  );
};

export default Cast;
