import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CurrentHunt } from "./pages/CurrentHunt";
import { NewHunt } from "./pages/NewHunt";

function App() {

  return (
    <div className="w-3xl min-h-200 flex flex-col justify-between gap-10 m-auto p-5 border">
      <Header />
      
      <Routes>

        <Route path="/"
          element={
          <div className="flex flex-col">
            <Link to="/continue">continue hunt</Link>
            <Link to="/new">new hunt</Link>
            <Link to="/new">my lists</Link>
            <Link to="/lists">about</Link>
          </div>
        }/>

        <Route path="/continue" element={<CurrentHunt />}/>
        <Route path="/new" element={<NewHunt />}/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
