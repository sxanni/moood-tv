import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import NotAvailable from "../components/NotAvailable";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Slider from "../components/Slider";
import SelectGenre from "../components/SelectGenre";

export default function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  //call code to load genres code from store/index.js
  const genresLoaded = useSelector((state) => state.moood.genresLoaded);
  const movies = useSelector((state) => state.moood.movies);
  const genres = useSelector((state) => state.moood.genres);
  // console.log(movies);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("in use effect");
    dispatch(getGenres());
    // to run this on the first render of component only once, insert below=> ' ,[] '
  }, []);

  useEffect(() => {
    // console.log(genresLoaded)
    // check if genres are loaded, then we dispatch the fetchMovies method with prop type of "all"
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  // useEffect(() => {
  //   dispatch(fetchMovies({ type: "movie" }));
  // }, [dispatch]);

  // useEffect(() => {
  // }, [movies]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  //pasted from login.jsx
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (currentUser) navigate("/");
  });

  //checking that movies var holds api data in console
  // console.log(movies);

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available: {
      text-align: center;
      color: red;
      margin-top: 4rem;
    }
  }
`;
