import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import styled from "styled-components";
import backgroundImage from "../assets/home.jpg";
import movieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";

export default function Moood() {
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
  //checking that movies var holds api data in console
  // console.log(movies);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={movieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => navigate("/player")}
            >
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}



const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }

      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          border: none;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.7;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: #fff;
            border: solid 1px;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
