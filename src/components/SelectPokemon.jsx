import AsyncSelect from "react-select/async";

export const SelectPokemon = () => {
  

  return (
    <AsyncSelect 
      // loadOptions={getNames} 
      // onChange={handleChange} 
      placeholder="Select a Pokémon..."
    />
  );
};