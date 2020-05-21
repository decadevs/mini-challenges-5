function rottenTomatoes(grid) {
  let nRow = grid.length;
  let nCol = grid[0].length;
  let noFresh = 0;
  let queue = [];
  //Add the position of all rotten tomatoe and count the no of fresh tomatoes
  for (let i = 0; i < nRow; i++) {
    for (let j = 0; j < nCol; j++) {
      if (grid[i][j] === 1) {
        noFresh += 1;
      } else if (grid[i][j] === 2) {
        queue.push([i, j]);
      }
    }
  }
  let minutes = 0;
  let fourDirection = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]; //up,down,left,right
  //loop as long as our queue length is not equal to  0 and no of fresh tomatoe greater than 0
  while (queue.length>0 && noFresh>0) {
    let size = queue.length;
    /*check if the adjacent node to the rotten tomatoe is fresh. if yes turn into rotten then return the position
   back to the queue
   1. no of fresh is reduced
   2. no of mintues is added
   */

    while (size--) {
      let positonOfFirstRottenOnQueue = queue.shift();
      let row = positonOfFirstRottenOnQueue[0];
      let col = positonOfFirstRottenOnQueue[1];

      for (let k = 0; k < fourDirection.length; k++) {
        let index_row = row + fourDirection[k][0];
        let index_col = col + fourDirection[k][1];
        if (
          index_row < 0 ||
          index_row >= nRow ||
          index_col < 0 ||
          index_col >= nCol ||
          grid[index_row][index_col] !== 1
        ) {
          continue;
        }
        noFresh--;
        grid[index_row][index_col] = 2;
        queue.push([index_row, index_col]);
      }
    }
    minutes++;
  }
  //if the no of fresh tomato is greater than then not all the tomatoes is rotten
  // but if the  no of fresh tomatoe is 0 then all the tomatoes are rotten
  return noFresh > 0 ? -1 : minutes;
}

module.exports = rottenTomatoes;
