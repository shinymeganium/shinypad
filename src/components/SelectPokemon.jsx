import AsyncSelect from "react-select/async";
import { getNames, selectPokemon } from "./UtilFuncs";

export const SelectPokemon = ({ setCurrent }) => {
  const handleChange = (selected) => {
    selectPokemon(selected, setCurrent);
  };

  return (
    <AsyncSelect 
      loadOptions={getNames} 
      onChange={handleChange} 
      placeholder="Select a Pokémon..."
    />
  );
};