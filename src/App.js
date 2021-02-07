import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import AppBar from "./components/AppBar/AppBar";
import Container from "./components/Container/Container";
import Spiner from "./components/Spiner/Spiner";

const HomePage = lazy(() =>
  import("./views/HomePage" /* webpackChunkName: "home-view" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./views/MovieDetailsPage" /* webpackChunkName: "movie-details-view" */
  )
);
const MoviesPage = lazy(() =>
  import("./views/MoviesPage" /* webpackChunkName: "movies-view" */)
);
const NotFoundView = lazy(() =>
  import("./views/NotFoundView" /* webpackChunkName: "not-found-view" */)
);

const App = () => (
  <Container>
    <AppBar />

    <Suspense fallback={<Spiner />}>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>

        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </Suspense>
  </Container>
);

export default App;
