export const Button = ({ onClick, styles, txt }) => {
  return (
    <button className={styles} onClick={onClick}>
      {txt}
    </button>
  );
};