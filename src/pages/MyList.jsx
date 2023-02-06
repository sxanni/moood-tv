import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres, getUserLikedMovies } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import NotAvailable from "../components/NotAvailable";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Slider from "../components/Slider";
import SelectGenre from "../components/SelectGenre";
import Card from "../components/Card";

export default function MyList() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  //call code to load genres code from store/index.js
  const movies = useSelector((state) => state.moood.movies);
  // console.log(movies);

  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [email]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
      <Navbar isScrolled={isScrolled} />
      </div>
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`

.content{
  margin: 2.3rem;
  margin-top:8rem ;
  gap:3rem;
  h1{
    margin-left: 3rem;
  }
  .grid{
    flex-wrap:wrap;
    gap:1rem;

  }
}

`;
