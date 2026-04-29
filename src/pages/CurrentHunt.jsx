import { useEffect } from "react";
import { Button } from "../components/Button";
import { useShinyDispatch, useShinyState } from "../ShinyProvider";
import { pauseHunt } from "../UtilFuncs";
import { useNavigate } from "react-router";

export const CurrentHunt = () => {
  const state = useShinyState();
  const dispatch = useShinyDispatch();
  const navigate = useNavigate();

  const add = () => {
    dispatch({ type: "INCREMENT_ENCOUNTERS", payload: state.current.count });
  }

  const dec = () => {
    dispatch({ type: "DECRTEMENT_ENCOUNTERS", payload: state.current.count });
  }

  const pause = async () => {
    await pauseHunt(dispatch, state.current);
  };

  if (state.loading)
    return <div className="">loading...</div>;

  if (!state.current.id)
    navigate("/");

  return (
    <div>
      <h3 className="">current hunt</h3>

      <img src={state.current.img} alt={state.current.name} />

      <h4 className="">{state.current.name}</h4>

      <span className="">{state.current.encounters}</span>

      <div className="">
        <Button txt="-" onClick={add} />
        <Button txt="+" onClick={dec} />
      </div>

      <Button txt="pause hunt" onClick={pause} />
    </div>
  );
};