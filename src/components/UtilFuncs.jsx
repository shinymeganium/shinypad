import { useEffect } from "react";

export const capitalizeWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const checkCurrent = async (setCurrent) => {
  const response = await fetch("http://localhost:5000/current");
  const json = await response.json();

  if (json && json.length > 0)
    setCurrent(json[0]);
  else
    setCurrent(null);
};

const getPokemonFromApi = async () => {
  const response = await fetch(`${import.meta.env.VITE_POKE_API}?limit=2000`);
  const data = await response.json();

  return data.results;
};

export const getNames = async (inputValue) => {
  const pokemonData = await getPokemonFromApi();

  return pokemonData.filter((p)=> p.name.toLowerCase()
    .includes(inputValue.toLowerCase())).map((p) => ({
      label: capitalizeWord(p.name),
      value: p.url,
    }));
};

export const selectPokemon = async (selected, setCurrent) => {
  if (!selected) return;

  const response = await fetch(selected.value);
  const pokemon = await response.json();

  setCurrent(pokemon);
};

export const startNewHunt = async (oldHunt, pokeApiData, setCurrent) => {
  if (!pokeApiData) return false;

  try {
    // 1. Archive the old hunt
    if (oldHunt && oldHunt.id) {
      const archiveRes = await fetch("http://localhost:5000/targets", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(oldHunt),
      });
      if (!archiveRes.ok) throw new Error("Archive failed");

      const deleteRes = await fetch(`http://localhost:5000/current/${oldHunt.id}`, { 
        method: "DELETE" 
      });
      if (!deleteRes.ok) throw new Error("Delete failed");
    }

    // 2. Prepare the new hunt object
    const newHuntObj = {
      name: capitalizeWord(pokeApiData.name),
      img: pokeApiData.sprites.front_shiny,
      encounters: 0
      // Let JSON Server handle the ID string
    };

    // 3. Save new hunt
    const response = await fetch("http://localhost:5000/current", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newHuntObj)
    });

    if (!response.ok) throw new Error("Failed to save the new hunt");
    
    const savedHunt = await response.json();
    
    // 4. Update state
    setCurrent(savedHunt);

    return true;
  } catch (error) {
    // This is where your NetworkError is being caught
    console.error("Hunt Transition Error:", error);
    return false;
  }
};