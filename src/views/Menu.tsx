import { MenuButton } from "../components/MenuButton";

export const Menu = () => {
  return (
    <div className="flex flex-col flex-1 items-center gap-10">
      <h2 className="p-6 text-5xl">shinypad</h2>

      <div className="flex flex-col">
        <MenuButton txt="continue" />
        <MenuButton txt="new" />
        <MenuButton txt="account" />
        <MenuButton txt="info" />
      </div>
    </div>
  );
};
