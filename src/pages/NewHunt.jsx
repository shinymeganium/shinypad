import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { SelectPokemon } from "../components/SelectPokemon";
import { SavePokemon } from "../components/UtilFuncs";

export const NewHunt = ({setCurrent}) => {
  const [selectedMon, setSelectedMon] = useState(null);
  let navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!selectedMon) {
      alert("Select a Pokémon!");
      return;
    }

    const success = SavePokemon(selectedMon, setCurrent);

    if (success)
      navigate("/continue");
    else
      alert("Starting a new hunt was not successful.");
  }

  return (
    <form className="flex flex-col gap-10" onSubmit={onSubmit}>

      <SelectPokemon setMon={setSelectedMon} />

      <button className="p-2 border" type="submit">start</button>

      <Link className="border" to="/">back</Link>
    </form>
  )
}
