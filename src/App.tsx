//import { ExampleScroll } from "./components/ExampleScroll";
import { Menu } from "./views/Menu";

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-20 sticky top-0 flex justify-end items-center p-4 bg-gray-300">
        <h1>shinypad</h1>
      </header>

      <main className="flex flex-col flex-1 gap-6 p-4">
        <Menu />
      </main>

      <footer className="bg-gray-300">dis footer yo</footer>
    </div>
  );
};
