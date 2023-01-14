import React, { useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import {createUserWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

export default function Signup() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] =useState(false);
  const [formValues, setFormValues] =useState({

    email:"",
    password:"",
  });

  const handleSignIn = async () => {
    // console.log(formValues);
    //if there are any errors the below will catch it and wont break our application
    try {
      //restructuring input from formValues and use firebaseauth function to pass data to firebase to create user
        const {email, password} = formValues;
        await createUserWithEmailAndPassword(firebaseAuth,email,password)
    } catch(err) {
      console.log(err)

    }
  };

  //After sign in, using firebase function onAuthStateChange check if theres a user, and navigate them to the home page if they are in database 
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });
  
  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Audio/Visuals to match your current mood </h1>
            <h4><em>"Fostering creativity and wellness through sensory data curation."</em></h4>
            <h6>Enter your email to create an account and feed your moood</h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email} 
              // once form values change replace the value/formValues.email with latest value change
              onChange={(e)=>setFormValues({
                ...formValues,[e.target.name]: e.target.value,
              })
            }
            />
            {/* if showPassword is true, show below input */}
            {
              showPassword &&
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formValues.password} 
              onChange={(e)=>setFormValues({
                ...formValues,[e.target.name]: e.target.value,
              })
            }
            />
            }
            {/* if showPassword is false, then => on btn click, set rd to true */}
            {!showPassword && 
            <button onClick={() => setShowPassword(true)}>Get Started</button>
            
            }
          </div>
          <button onClick={handleSignIn} className="login-btn">Sign Up</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  

  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        margin-top: 90vh;
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 15rem;
        }
        h4 {
          padding: 2rem 10rem;
          font-weight:normal;
          color:#e50914;
          em {
                background-color:white;
                padding:0 2rem;
          }
          
        }
      }
      .form {
        display: grid;
        grid-template-columns:${({showPassword})=>showPassword ?"1fr 1fr":"2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          z-index: 11;
          padding: 0.5rem 1rem;
          background-color: #e50914;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
          z-index: 11;
          padding: 0.5rem 1rem;
          background-color: #e50914;
          cursor: pointer;
          color: white;
          border:none;
          border-radius: 0.2rem;
          font-weight: bolder;
          font-size: 1.05rem;
        }
    }
  }
`;
