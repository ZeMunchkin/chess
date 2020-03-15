export const isEven = num => num % 2 === 0;
export const isOdd = num => num % 2 !== 0;

export const isShaded = (row, column) => (
  (isEven(row) && isOdd(column)) || (isOdd(row) && isEven(column))
);
