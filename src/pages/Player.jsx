import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/hypno-fireball.mp4";
// import Navbar from "../components/Navbar";

export default function Player() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video src={video} autoplay loop controls muted></video>
      </div>
    </Container>
  );
}
const Container = styled.div`
.back{
    font-size: 2rem;
    position: absolute;
    left:1.5rem;
    cursor: pointer;
    z-index: 1;
    padding: 2rem;
    &:hover{
       color: #f34242;;
    }
}
video{
    width: 100vw;
    height: 100vh;
}
`;
