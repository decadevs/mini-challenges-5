function rottenTomatoes(grid) {

  const numRows = grid.length;
  const numCols = grid[0].length;
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ];
  const queue = [];
  let fresh = 0;
  let minutes = 0;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
      }
      if (grid[i][j] === 1) {
        fresh += 1;
      }
    }
  }

  while (queue.length && fresh) {
    const len = queue.length;

    for (let q = 0; q < len; q++) {
      const rotten = queue.shift();

      for (let i = 0; i < directions.length; i++) {
        const dir = directions[i];
        const row = rotten[0] + dir[0];
        const col = rotten[1] + dir[1];

        if (row >= 0 && row < numRows && col >= 0 && col < numCols && grid[row][col] === 1) {
          grid[row][col] = 2;
          fresh -= 1;
          queue.push([row, col]);
        }
      }
    }

    minutes += 1;
  }

  return fresh > 0 ? -1 : minutes;

}

module.exports = rottenTomatoes;
