import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Moood from "./pages/Moood";
import Player from "./pages/Player";
// this import maps Moods nav to Movies.jsx page
import Moods from "./pages/Movies"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/moods" element={<Moods />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Moood />} />

      </Routes>
    </BrowserRouter>
  )
}

