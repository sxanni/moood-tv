import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import styled from 'styled-components';

export default function Moood() {

  const[isScrolled,setIsScrolled] = useState(false);

  window.onscroll =()=> {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
  };
  return( 
    <Container>
    <Navbar isScrolled={isScrolled}/>
  </Container>
  );
  
}

const Container = styled.div``;