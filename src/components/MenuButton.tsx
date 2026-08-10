type MenuButtonProps = {
  txt: string;
}

export const MenuButton = ({ txt }: MenuButtonProps) => {
  return (
    <button className="w-3xs rounded-full p-7 bg-gray-100">
      {txt}
    </button>
  )
}
