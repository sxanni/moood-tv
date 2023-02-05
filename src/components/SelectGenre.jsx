import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre, getGenres } from "../store";

export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  return (
    <Select
      className="flex"
      onChange={(e) => {
        dispatch(fetchDataByGenre({ genre: e.target.value, type }));
      }}
    >
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
}

const Select = styled.select`
margin-left:5rem;
padding: .7rem;
padding-right:50px;
cursor:pointer;
border-radius:1.5rem;
font-size:1.3rem;
background-color: rgba(8,8,0,0.3);
color: white;
`;
