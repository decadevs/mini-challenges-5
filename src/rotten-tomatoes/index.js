// Boundary check
function isOutOfBound(i, j, R, C) {
  return i >= 0 && j >= 0 && i < R && j < C;
}

// check if atleast one tomato is fresh
function isFresh(grid, R) {
  for (let i = 0; i < R; i++) {
    if (grid[i].includes(1)) {
      return -1;
    }
  }

  return false;
}

function rottenTomatoes(grid) {
  //scan the grid and store the location of all the rotten tomatoes
  let queue = [];
  let minutes = 0;
  const ROW = grid.length;
  const COL = grid[0].length;
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (grid[i][j] === 2) {
        queue.push({ timeFrame: 0, x: i, y: j });
      }
    }
  }

  // // rot adjacent tomatoes
  while (queue.length > 0) {
    var rot = queue.shift();
    console.log(rot);

    // right
    if (
      isOutOfBound(rot.x, rot.y + 1, ROW, COL) &&
      grid[rot.x][rot.y + 1] === 1
    ) {
      grid[rot.x][rot.y + 1] = 2;
      queue.push({ timeFrame: minutes + 1, x: rot.x, y: rot.y + 1 });
    }
    // // left
    if (
      isOutOfBound(rot.x, rot.y - 1, ROW, COL) &&
      grid[rot.x][rot.y - 1] === 1
    ) {
      grid[rot.x][rot.y - 1] = 2;
      queue.push({ timeFrame: minutes + 1, x: rot.x, y: rot.y - 1 });
    }
    // //up
    if (
      isOutOfBound(rot.x - 1, rot.y, ROW, COL) &&
      grid[rot.x - 1][rot.y] === 1
    ) {
      grid[rot.x - 1][rot.y] = 2;
      queue.push({ timeFrame: minutes + 1, x: rot.x - 1, y: rot.y });
    }
    // //down
    if (
      isOutOfBound(rot.x + 1, rot.y, ROW, COL) &&
      grid[rot.x + 1][rot.y] === 1
    ) {
      grid[rot.x + 1][rot.y] = 2;
      queue.push({ timeFrame: minutes + 1, x: rot.x + 1, y: rot.y });
    }
  }

  return isFresh(grid, ROW) ? -1 : rot.timeFrame;
}

const Input = [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
];
console.log(rottenTomatoes(Input));
module.exports = rottenTomatoes;

// console.log(rot);
// output:

// { timeFrame: 0, x: 0, y: 0 }
// { timeFrame: 1, x: 0, y: 1 }
// { timeFrame: 1, x: 1, y: 0 }
// { timeFrame: 1, x: 0, y: 2 }
// { timeFrame: 1, x: 1, y: 1 }
// { timeFrame: 1, x: 2, y: 1 }
// { timeFrame: 1, x: 2, y: 2 }
// 1

// expected:
// { timeFrame: 0, x: 0, y: 0 }
// { timeFrame: 1, x: 0, y: 1 }
// { timeFrame: 1, x: 1, y: 0 }
// { timeFrame: 2, x: 0, y: 2 }
// { timeFrame: 2, x: 1, y: 1 }
// { timeFrame: 3, x: 2, y: 1 }
// { timeFrame: 4, x: 2, y: 2 }
// 4
