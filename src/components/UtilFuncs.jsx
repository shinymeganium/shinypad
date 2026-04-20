export const CapitalizeWord = (word) => {
  const first = word.slice(0, 1).toUpperCase();
  const rest = word.slice(1, word.length);

  return first.concat(rest);
};