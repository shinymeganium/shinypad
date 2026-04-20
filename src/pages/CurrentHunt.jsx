import { Link } from "react-router";
import { Button } from "../components/Button";

export const CurrentHunt = () => {
  return (
    <div className="">
      <h3>CurrentHunt</h3>
      <div className="">picture goes here</div>
      <h4 className="">name of pokemon here</h4>
      <p>counter goes here</p>
      <Button text="-" />
      <Button text="+" />
      <p></p>
      <Link to="/">back</Link>
    </div>
  )
}
