import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/Button";
import { DisplayPokemon } from "../components/UtilFuncs";

export const CurrentHunt = () => {
  const [name, setName] = useState(null);
  const [img, setImg] = useState(null);
  const [encounters, setEncounters] = useState(0);
  const btnStyles =  "p-1 border";

  const add = () => setEncounters(prev => prev + 1);
  const subtract = () => encounters && setEncounters(prev => prev - 1);

  DisplayPokemon(setName, setImg);

  return (
    <div className="">
      <div className="">
        <h3>CurrentHunt</h3>
        <img src={img} alt={name} />
        <h4 className="">{name}</h4>
        <p>{encounters}</p>
        <Button onClick={subtract} styles={btnStyles} text="-" />
        <Button onClick={add} styles={btnStyles} text="+" />
      </div>
      <Link to="/">back</Link>
    </div>
  )
}
