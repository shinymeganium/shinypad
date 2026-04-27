import { SelectPokemon } from "../components/SelectPokemon";
import { Link } from "react-router";

export const NewHunt = () => {
  return (
    <form className="w-full flex flex-col gap-10">

      <SelectPokemon />

      <button className="p-2 border" type="button" >start</button>

      <Link className="border" to="/">back</Link>
    </form>
  );
};