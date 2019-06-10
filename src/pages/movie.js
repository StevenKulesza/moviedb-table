import React from "react";
import Index from "../containers/index";
import { MOVIE_DATA, MOVIE_TITLES } from "../constants";

const Movie = () => <Index data={MOVIE_DATA} titles={MOVIE_TITLES} />;

export default Movie;
