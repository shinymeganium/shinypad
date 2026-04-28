import { useEffect } from "react";
import { Button } from "../components/Button";
import { useShinyDispatch, useShinyState } from "../ShinyProvider";

export const CurrentHunt = () => {
  const state = useShinyState();
  const dispatch = useShinyDispatch();

  if (state.loading)
    return <div className="">loading...</div>;

  if (!state.current[0])
    return <div className="">wait</div>

  return (
    <div>
      <h3 className="">current hunt</h3>

      <img src={state.current[0].img} alt={state.current[0].name} />

      <h4 className="">{state.current[0].name}</h4>

      <span className="">{state.current[0].encounters}</span>

      <Button txt="-" />
      <Button txt="+" />
    </div>
  );
};