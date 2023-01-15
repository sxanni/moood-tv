import React from 'react';
import background from "../assets/rotate-head.gif";
import styled from 'styled-components'
export default function BackgroundImage() {
  return (
    <Container>
        <img src={background} alt="" />
    </Container>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
img { 
  height: 100vh;
  width: 100vw;
}
`;