import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/Button";

export const CurrentHunt = ({ current }) => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(null);
  const [img, setImg] = useState(null);
  const [encounters, setEncounters] = useState(0);
  const btnStyles = "p-1 border";

  const add = () => setEncounters(prev => prev + 1);
  const subtract = () => encounters && setEncounters(prev => prev - 1);


  return (
    <div className="">
      {!loading && <div className="">
        <h3>CurrentHunt</h3>
        <img src={img} alt={name} />
        <h4 className="">{name}</h4>
        <p>{encounters}</p>
        <Button onClick={subtract} styles={btnStyles} text="-" />
        <Button onClick={add} styles={btnStyles} text="+" />
      </div>}
      <Link to="/">back</Link>
    </div>
  )
}
