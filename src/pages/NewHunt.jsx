import { useState } from "react";
import { SelectPokemon } from "../components/SelectPokemon";
import { useNavigate } from "react-router";
import { pauseHunt, setCurrent } from "../UtilFuncs";
import { useShinyDispatch, useShinyState } from "../ShinyProvider";

export const NewHunt = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const state = useShinyState();
  const dispatch = useShinyDispatch();

  const onStart = async () => {
    await setCurrent(state, dispatch, selected, navigate);
  };

  return (
    <form className="w-full flex flex-col gap-10">

      <SelectPokemon setSelected={setSelected} />

      <button className="p-2 border" type="button" onClick={onStart}>start</button>
    </form>
  );
};