import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { SelectPokemon } from "../components/SelectPokemon";
import { startNewHunt } from "../components/UtilFuncs";

export const NewHunt = ({ current, setCurrent }) => {
  const [selectedMon, setSelectedMon] = useState(null);
  let navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMon) {
      alert("Select a Pokémon!");
      return;
    }

    const success = await startNewHunt(current, selectedMon, setCurrent)

    if (success) {
      setTimeout(() => {
        navigate("/continue", {replace: true});
      }, 1000);
    }
    else
      alert("There was a sync issue, but check the 'Continue' page!");
  }

  return (
    <form className="flex flex-col gap-10">

      <SelectPokemon setCurrent={setSelectedMon} />

      <button className="p-2 border" type="button" onClick={onSubmit}>start</button>

      <Link className="border" to="/">back</Link>
    </form>
  );
};