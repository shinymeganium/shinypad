import AsyncSelect from "react-select/async";
import { getNames, setCurrent } from "../UtilFuncs";
import { useShinyDispatch, useShinyState } from "../ShinyProvider";

export const SelectPokemon = ({ setSelected }) => {
  const state = useShinyState();
  const dispatch = useShinyDispatch();

  const onLoadOptions = (input) => {
    return getNames("https://pokeapi.co/api/v2/pokemon?limit=2000", input);
  };

  const handleChange = (option) => {
    if (!option) {
      setSelected(null);
      return;
    }

    setSelected(option.value);
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={onLoadOptions} 
      onChange={handleChange} 
      placeholder="Select a Pokémon..."
    />
  );
};