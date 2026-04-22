import { useEffect } from "react";

export const CapitalizeWord = (word) => {
  const first = word.slice(0, 1).toUpperCase();
  const rest = word.slice(1, word.length);

  return first.concat(rest);
};

export const CheckCurrent = async () => {
  const respond = await fetch("http://localhost:5000/current");
  const data = await respond.json();

  if (data.length) {
    return data;
  }

  return null;
};

export const SavePokemon = async (pokemon, setCurrent) => {
  if (CheckCurrent().length) {
    const response = await fetch("http://localhost:5000/current", {
      method: "DELETE"
    });
  }

  const current = {
    "name": CapitalizeWord(pokemon.name),
    "img": pokemon.sprites.front_shiny,
    "encounters": 0
  };

  const response = await fetch("http://localhost:5000/current", {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(current)
  });

  setCurrent(current);
  return response.ok;
};

