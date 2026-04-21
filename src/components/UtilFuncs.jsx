import { useEffect } from "react";

export const CapitalizeWord = (word) => {
  const first = word.slice(0, 1).toUpperCase();
  const rest = word.slice(1, word.length);

  return first.concat(rest);
};

export const SavePokemon = async (pokemon) => {
  const current = {
    "id": 1,
    "name": CapitalizeWord(pokemon.name),
    "img": pokemon.sprites.front_shiny,
    "encounters": 0
  };

  const response = await fetch("http://localhost:5000/current/1", {
    method: "PUT",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(current)
  });

  return response.ok;
};

export const DisplayPokemon = async (setPokemon, setImg) => {
  const response = await fetch("http://localhost:5000/current/1");
  const pokemon = await response.json();

  setPokemon(pokemon.name);
  setImg(pokemon.img);
};