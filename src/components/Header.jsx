import React from 'react';
import {useNavigate} from "react-router-dom";
import styled from 'styled-components';
import logo from "../assets/moood-logo-bat-red-white.png";

export default function Header(props) {
    // declare navigate prop const
  const navigate = useNavigate();
  return (
    <Container className='flex a-center j-between'>
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>

        {/* on click, if theres a login prop, redirect to /login page, else redirect to /signup page */}
        <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
            {/* if pros has sent login prp, write log in else write sign in  */}
            {props.login ? "Log In" : "Sign In"}
        </button>

    </Container>
  );
}

const Container = styled.div`
padding: 0 3rem;
background-color: rgba(0, 0, 0, 0.1);
z-index: 1;
position: fixed;
width: 100vw;
.logo{
    img{
        height: 3rem;
    }
}
button {
    z-index:11;
    padding: 0.5rem 1rem;
    background-color: #e50914 ;
    cursor: pointer;
    color: white;
    border:none;
    border-radius:0.2rem;
    font-weight: bolder;
    font-size:1.05rem;
}

`;
