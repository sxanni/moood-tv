import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";

export default function Movies() {
    const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  //call code to load genres code from store/index.js
  const genresLoaded = useSelector((state) => state.moood.genresLoaded);
  const  movies  = useSelector((state) => state.moood.movies);
  // console.log(movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
    // to run this on the first render of component only once, insert below=> ' ,[] '
  }, []);

  useEffect(() => {
    // check if genres are loaded, then we dispatch the fetchMovies method with prop type of "all"
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  });

  // useEffect(() => {
  //   dispatch(fetchMovies({ type: "movie" }));
  // }, [dispatch]);

  // useEffect(() => {
  // }, [movies]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);

    return () => (window.onscroll = null);
  };
  //checking that movies var holds api data in console
  // console.log(movies);
  return (
    <div>Movies</div>
  )
}
