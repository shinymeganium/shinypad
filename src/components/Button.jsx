export const Button = ({ onClick, styles, text }) => {
  return (
    <button className={styles} onClick={onClick}>
      {text}
    </button>
  );
};