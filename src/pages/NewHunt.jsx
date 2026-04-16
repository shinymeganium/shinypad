import { Link } from "react-router";
import AsyncSelect from "react-select/async";

export const NewHunt = () => {
  return (
    <form className="flex flex-col gap-5" action="">

      <div className=" flex gap-5">
        <label htmlFor="">pokémon</label>
        <AsyncSelect />
      </div>

      <button className="border" type="submit">start</button>

      <Link className="block" to="/">back</Link>
    </form>
  )
}
