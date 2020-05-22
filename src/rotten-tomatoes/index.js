function rottenTomatoes(grid) {

  const numRows = grid.length;
  const numCols = grid[0].length;
  const allDirections = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ];
  const queue = [];
  let freshTomatoes = 0;
  let minutes = 0;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
      }
      if (grid[i][j] === 1) {
        freshTomatoes += 1;
      }
    }
  }

  while (queue.length && freshTomatoes) {
    const len = queue.length;

    for (let q = 0; q < len; q++) {
      const rotten = queue.shift();

      allDirections.forEach(direction => {
        const row = rotten[0] + direction[0];
        const col = rotten[1] + direction[1];

        if (row >= 0 && row < numRows && col >= 0 && col < numCols && grid[row][col] === 1) {
          grid[row][col] = 2;
          freshTomatoes -= 1;
          queue.push([row, col]);
        }
      })

    }

    minutes += 1;
  }

  return freshTomatoes > 0 ? -1 : minutes;

}

module.exports = rottenTomatoes;
