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
  // Queue position of all rotten tomatoes and add up all fresh tomatoes
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
  // freshTomatoes is in the while loop to ensure there is atleast a
  // fresh tomato to be rottened before incrementing minutes
  while (queue.length && freshTomatoes) {
    // Ensure that a set of rotten tomatoes is looped over
    const len = queue.length;
    // Loop over each set of rotten tomatoes
    for (let q = 0; q < len; q++) {
      const rotten = queue.shift();
      // Loop through each direction checking for fresh tomatoes
      allDirections.forEach(direction => {
        const row = rotten[0] + direction[0];
        const col = rotten[1] + direction[1];

        if (row >= 0 && row < numRows && col >= 0 && col < numCols && grid[row][col] === 1) {
          grid[row][col] = 2; // rotten fresh tomato if found
          freshTomatoes -= 1; // reduce fresh tomatoes count
          queue.push([row, col]); // add position of the latest rotten tomato to queue
        }
      })

    }
    minutes += 1; // increment minutes
  }
  // return -1 if freshTomatoes is greater than 1 else return minutes
  return freshTomatoes > 0 ? -1 : minutes;
}

module.exports = rottenTomatoes;
