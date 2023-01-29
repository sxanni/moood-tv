import React from "react";
import CardSlider from "./CardSlider";

//grab and pass movies var into this component
export default function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  return (
    <div>
      <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
      <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />
      <CardSlider
        title="Blockbuster Movies"
        data={getMoviesFromRange(20, 30)}
      />
      <CardSlider
        title="Anime Music Visuals"
        data={getMoviesFromRange(30, 40)}
      />
      <CardSlider
        title="Synth Wave Visuals"
        data={getMoviesFromRange(40, 50)}
      />
      <CardSlider title="For You" data={getMoviesFromRange(50, 60)} />
    </div>
  );
}
