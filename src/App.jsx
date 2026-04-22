import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CurrentHunt } from "./pages/CurrentHunt";
import { NewHunt } from "./pages/NewHunt";
import { CheckCurrent } from "./components/UtilFuncs";

function App() {
  const [current, setCurrent] = useState(null);
  const [hunting, setHunting] = useState(false);

  useEffect(() => {
    setCurrent(CheckCurrent());

    if (current !== null)
      setHunting(true);
  }, []);

  return (
    <div className="w-3xl min-h-200 flex flex-col justify-between gap-10 m-auto p-5 border">
      <Header />
      
      <Routes>

        <Route path="/"
          element={
          <div className="flex flex-col">
            {hunting && <Link to="/continue">continue hunt</Link>}
            <Link to="/new">new hunt</Link>
            <Link to="/new">my lists</Link>
            <Link to="/lists">about</Link>
          </div>
        }/>

        <Route path="/continue" element={<CurrentHunt current={current} />}/>
        <Route path="/new" element={<NewHunt setCurrent={setCurrent} />}/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
