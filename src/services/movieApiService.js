import axios from "axios";

const api_key = "d3b4e2b6590fadf64c27140207cd1cc0";
const axiosInstance = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
});

export const fetchTrendingMovies = () =>
  axiosInstance
    .get(`trending/movie/day?api_key=${api_key}`)
    .then(({ data }) => data.results);

export const fetchMoviesByKeyWord = (searchQuery) =>
  axiosInstance
    .get(`search/movie?api_key=${api_key}&query=${searchQuery}`)
    .then(({ data }) => data.results);

export const fetchMovieByID = (id) =>
  axiosInstance.get(`movie/${id}?api_key=${api_key}`).then(({ data }) => data);

export const fetchCastByMovieID = (id) =>
  axiosInstance
    .get(`movie/${id}/credits?api_key=${api_key}`)
    .then(({ data }) => data.cast);

export const fetchReviewsByMovieID = (id) =>
  axiosInstance
    .get(`movie/${id}/reviews?api_key=${api_key}`)
    .then(({ data }) => data.results);
