const symbols = ['A', 'B', 'C', 'D', 'E'];
const rows = 3;
const cols = 3;
const winMultiplier = 5;

const generateMatrix = () => {
  let matrix = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }
    matrix.push(row);
  }
  return matrix;
};

const calculateWinnings = (matrix) => {
  let winnings = 0;
  for (let row of matrix) {
    if (row.every(symbol => symbol === row[0])) {
      winnings += winMultiplier;
    }
  }
  return winnings;
};

module.exports = {
  generateMatrix,
  calculateWinnings
};
