import { useEffect } from "react";
import { Button } from "../components/Button";
import { useShinyDispatch, useShinyState } from "../ShinyProvider";
import { pauseHunt } from "../UtilFuncs";
import { useNavigate } from "react-router";

export const CurrentHunt = () => {
  const state = useShinyState();
  const dispatch = useShinyDispatch();
  const navigate = useNavigate();
  const numBtn = "size-10 cursor-pointer border";
  const funcBtn = "w-25 p-2 border";

  const add = () => {
    dispatch({ type: "INCREMENT_ENCOUNTERS", payload: state.current.count });
  }
  
  const dec = () => {
    dispatch({ type: "DECRTEMENT_ENCOUNTERS", payload: state.current.count });
  }

  const pause = async () => {
    await pauseHunt(dispatch, state.current);
  };

  const endHunt = async () => {
    
  }

  if (state.loading)
    return <div className="">loading...</div>;

  if (!state.current.id)
    navigate("/");

  return (
    <div className="flex flex-col gap-5">
      <h3 className="">current hunt</h3>

      <img src={state.current.img} alt={state.current.name} />

      <h4 className="">{state.current.name}</h4>

      <span className="">{state.current.encounters}</span>

      <div className="flex gap-10">
        <Button txt="-" styles={numBtn} onClick={dec} />
        <Button txt="+" styles={numBtn} onClick={add} />
      </div>

      <div className="flex flex-col gap-2">
        <Button txt="pause hunt" styles={funcBtn} onClick={pause} />
        {/* <Button txt="end hunt" styles={funcBtn} onClick={pause} /> */}
      </div>
    </div>
  );
};