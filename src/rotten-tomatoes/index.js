function rottenTomatoes(grid) {
  let count = 0;
  let queue = []
  let freshCount = 0
  const numRows = grid.length;
  const numCols = grid[0].length;
  const allDirections = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
  ];
  for (let x = 0; x < numRows; x++){
    for (let y = 0; y < numCols; y++){
      if (grid[x][y] === 2){
        queue.push([x,y])
      }
      if (grid[x][y] === 1){
        freshCount++
      }
    }
  }
  while (queue.length && freshCount) {
    // Ensure that a set of rotten tomatoes is looped over
    const len = queue.length;
    // Loop over each set of rotten tomatoes and remove each rotten tomato from queue
    for (let q = 0; q < len; q++) {
      const rotten = queue.shift();
      // Loop through each direction relative to
      //current rotten tomato checking for fresh tomatoes
      allDirections.forEach(direction => {
        const row = rotten[0] + direction[0];
        const col = rotten[1] + direction[1];

        if (row >= 0 && row < numRows && col >= 0 && col < numCols && grid[row][col] === 1) {
          grid[row][col] = 2; // rotten fresh tomato if found
          freshCount -= 1; // reduce fresh tomatoes count
          queue.push([row, col]); // add position of the latest rotten tomato to queue
        }
      })

    }
    count += 1; // increment count
  }
  /**for(let i = 0; i < grid.length; i ++) {
    let changed = false
    for(let j = 0; j < grid[i].length; j++) {
      if(grid[i][j]===2) {
        if (i+1 < grid.length && grid[i+1][j] === 1) {
          grid[i][j] = 2; // rotten fresh tomato if found
          freshCount -= 1; // reduce fresh tomatoes count
          queue.push([i, j]); // add position of the latest rotten tomato to queue
        }
        if (j < grid[i].length && grid[i][j+1] === 1){  //
          grid[i][j] = 2; // rotten fresh tomato if found
          freshCount -= 1; // reduce fresh tomatoes count
          queue.push([i, j]); // add position of the latest rotten tomato to queue
        }
        if (i > 0 && grid[i-1][j] === 1) {
          grid[i][j] = 2; // rotten fresh tomato if found
          freshCount -= 1; // reduce fresh tomatoes count
          queue.push([i, j]); // add position of the latest rotten tomato to queue
        }
        if (grid[i][j-1] === 1){
          grid[i][j] = 2; // rotten fresh tomato if found
          freshCount -= 1; // reduce fresh tomatoes count
          queue.push([i, j]); // add position of the latest rotten tomato to queue
        }
      }

    }



    }**/
    /**for(let k = 0; k < grid.length; k ++) {
      for(let z = 0; z < grid[k].length; z++) {
        if(grid[k][z] === 1) {
          return -1
        }

      }**/
    return freshCount > 0 ? -1 : count;

   /** if ( count > 0 ) {
      return count
    }else {
      return 0
    }**/

  }

  /**console.log(rottenTomatoes(
    grid = [
      [2, 1, 1],
      [1, 1, 0],
      [0, 1, 1],
    ])
  );
**/
module.exports = rottenTomatoes;
