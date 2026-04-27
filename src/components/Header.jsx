import { Link, useLocation } from "react-router";

export const Header = () => {
  const location = useLocation();
  const notHome = location.pathname !== "/";
  
  return (
    <header className="w-full flex flex-col">
      <h1 className="text-3xl font-bold">Shiny Pokémon App</h1>
      <h2 className="">Keep track of your shiny hunts!</h2>

      {notHome && <nav className="mt-5">
        <Link to="/">back</Link>
      </nav>}
    </header>
  );
};