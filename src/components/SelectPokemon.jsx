import { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { CapitalizeWord } from './UtilFuncs';

export const SelectPokemon = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Function for the Search Dropdown (Names only)
  const fetchAll = async (inputValue) => {
    const response = await fetch(`${import.meta.env.VITE_POKE_API}?limit=2000`);
    const names = await response.json();
    
    return names.results.filter(p =>
      p.name.includes(inputValue)).map(p =>
      ({ label: CapitalizeWord(p.name), value: p.url }));
  };

  // 2. Function to fetch specific data when a user clicks an option
  const handleSelect = async (selected) => {
    setLoading(true);
    
    try {
      const response = await fetch(selected.value); // Fetch the specific URL
      const url = await response.json();
      
      setInfo({
        name: url.name,
        image: url.sprites.front_default // Path to the image
      });
    }
    catch (err) {
      console.error("Failed to fetch details", err);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AsyncSelect 
        loadOptions={fetchAll} 
        onChange={handleSelect} 
        placeholder="Select a Pokemon..."
      />

      {loading && <p>Loading stats...</p>}

      {info && !loading && (
        <div className="card">
          <img src={info.image} alt={info.name} />
          <h2>{CapitalizeWord(info.name)}</h2>
        </div>
      )}
    </div>
  );
};