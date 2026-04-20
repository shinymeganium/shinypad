import { useEffect, useState } from "react";
import { Link } from "react-router";
import { SelectPokemon } from "../components/SelectPokemon";

export const NewHunt = () => {
  const [selectedMon, setSelectedMon] = useState(null);
    
  

  return (
    <form className="flex flex-col gap-5" action="">

      <div className=" flex gap-5">
        <label htmlFor="">pokémon</label>
      </div>

      <SelectPokemon />

      <button className="border" type="submit">start</button>

      <Link className="block" to="/">back</Link>
    </form>
  )
}
