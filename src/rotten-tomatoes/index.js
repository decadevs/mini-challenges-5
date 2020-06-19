function rottenTomatoes(grid) {
  let count = 2;
  const rotten = (grid, x, y) => {
    let directions = [
      [1, 0], // down
      [0, 1], // right
      [-1, 0], // up
      [0, -1], // left
    ];

    for (var d_index = 0; d_index < directions.length; d_index++) {
      let row_to_go = x + directions[d_index][0];
      let col_to_go = y + directions[d_index][1];

      if (
        row_to_go >= 0 &&
        row_to_go < grid.length &&
        col_to_go >= 0 &&
        col_to_go < grid[0].length &&
        (grid[row_to_go][col_to_go] === 1 ||
          grid[row_to_go][col_to_go] > grid[x][y] + 1)
      ) {
        grid[row_to_go][col_to_go] = grid[x][y] + 1;
        rotten(grid, row_to_go, col_to_go);
      }
    }
  };

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === 2) {
        rotten(grid, x, y);
      }
    }
  }

  for (let l = 0; l < grid.length; l++) {
    for (let k = 0; k < grid[l].length; k++) {
      if (grid[l][k] === 1) {
        return -1;
      } else if (grid[l][k] > count) {
        count = grid[l][k];
      }
    }
  }

  return count - 2;
}

module.exports = rottenTomatoes;
