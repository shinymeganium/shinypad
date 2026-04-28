import { useEffect } from "react";
import { NavLink, Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { CurrentHunt } from "./pages/CurrentHunt";
import { NewHunt } from "./pages/NewHunt";
import { Footer } from "./components/Footer";
import { useShinyDispatch, useShinyState } from "./ShinyProvider";
import { onAppStart } from "./UtilFuncs";

export default function App() {
  const state = useShinyState();
  const dispatch = useShinyDispatch();

  useEffect(() => {
    onAppStart(dispatch);
  }, []);

  // useEffect(() => {
  //   console.log(state)
  // }, [state])
  
  return (
    <div className="w-xl h-screen flex flex-col items-center gap-10 m-auto border">
      <Header />

      <div className="w-full flex flex-col justify-center items-center flex-1 gap-2">
        <Routes>
          <Route
            path="/"
            element={
              <>
              {!state.loading && state.current[0] && <NavLink to="/continue">continue hunt</NavLink>}
              <NavLink to="/new">new hunt</NavLink>
              <NavLink to="/lists">my pokemon</NavLink>
              <NavLink to="/about">about</NavLink>
              </>
            } />

            <Route path="/continue" element={<CurrentHunt />} />

            <Route path="/new" element={<NewHunt />} />
            {/* <Route path="/continue" element={<CurrentHunt />} /> */}
        </Routes>
      </div>

      <Footer />
    </div>
  );
}