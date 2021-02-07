import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdditionalInfoItem from "../components/AdditionalInfoItem/AdditionalInfoItem";
import ErrorBox from "../components/Error/ErrorBox";
import Spiner from "../components/Spiner/Spiner";
import { fetchReviewsByMovieID } from "../services/movieApiService";

const Reviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async (movieId) => {
      try {
        setIsFetching(true);

        const reviews = await fetchReviewsByMovieID(movieId);

        if (reviews.length === 0) {
          throw Error("Can't find reviews for the movie!");
        }

        setReviews(reviews);
        setIsFetching(false);
      } catch ({ message }) {
        setIsFetching(false);
        setError(message);
      }
    };

    getReviews(movieId);
  }, [movieId]);

  return (
    <>
      {reviews && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <AdditionalInfoItem
                name={author}
                description="Overview: "
                content={content}
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

export default Reviews;
