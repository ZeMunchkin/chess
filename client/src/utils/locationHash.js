export const createLocationHash = (row, column) => `${row}-${column}`;

export const parseLocationHash = $hash => {
  const row = Number($hash.slice(0, 1));
  const column = Number($hash.slice(2));

  return [row, column];
};
