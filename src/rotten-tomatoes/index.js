// Pseudo:
// Create an empty queue queue.
// Find all rotten tomatoes and enqueue them to queue. Also enqueue a delimiter to indicate the beginning of next time frame.
// Run a loop While queue is not empty
// Do following while delimiter in queue is not reached
// Dequeue an tomatoes from the queue, rot all adjacent tomatoes. While rotting the adjacent, make sure that the time frame is incremented only once. And the time frame is not incremented if there are no adjacent tomatoes.
// Dequeue the old delimiter and enqueue a new delimiter. The tomatoes rotten in the previous time frame lie between the two delimiters.
// Function to check whether the cell is delimiter
// which is (-1, -1)

// // Boundary check
function boundaryCheck(i, j, R, C) {
  return i >= 0 && j >= 0 && i < R && j < C;
}

// // check if atleast one tomato is fresh
function isFresh(grid, R) {
  for (let i = 0; i < R; i++) {
    if (grid[i].includes(1)) {
      return true;
    }
  }
  return false;
}

function isdelim(x, y) {
  return x == -1 && y == -1;
}

function rottenTomatoes(grid) {
  // Create a queue of cells
  let queue = [];
  let minutes = 0;
  const R = grid.length;
  const C = grid[0].length;
  // Store all the cells having rotten tomatoes in first time frame
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (grid[i][j] === 2) {
        queue.push({ x: i, y: j });
      }
    }
  }
  // Separate these rotten tomatoes from the tomatoes which will rotten
  // due the tomatoes in first time frame using delimiter which is (-1, -1)
  let delimiter = { x: -1, y: -1 };
  queue.push(delimiter);
  // return queue;
  // Process the grid while there are rotten tomatoes in the queue
  while (queue.length > 0) {
    // This flag is used to track the start of a timeframe
    let flag = false;
    // Process all the rotten tomatoes in current time frame.
    while (!isdelim(queue[0].x, queue[0].y)) {
      let temp = queue[0];
      // Check right adjacent cell that if it can be rotten
      if (
        boundaryCheck(temp.x + 1, temp.y, R, C) &&
        grid[temp.x + 1][temp.y] == 1
      ) {
        // if this is the first tomatoes to get rotten, increase
        // count and set the flag.
        if (!flag) {
          minutes++;
          flag = true;
        }

        // Make the tomatoes rotten
        grid[temp.x + 1][temp.y] = 2;
        queue.push({ x: temp.x + 1, y: temp.y });
      }

      // Check left adjacent cell that if it can be rotten
      if (
        boundaryCheck(temp.x - 1, temp.y, R, C) &&
        grid[temp.x - 1][temp.y] == 1
      ) {
        if (!flag) {
          minutes++;
          flag = true;
        }
        grid[temp.x - 1][temp.y] = 2;

        queue.push({ x: temp.x - 1, y: temp.y }); // push this cell to queue
      }

      // Check top adjacent cell that if it can be rotten
      if (
        boundaryCheck(temp.x, temp.y + 1, R, C) &&
        grid[temp.x][temp.y + 1] == 1
      ) {
        if (!flag) {
          minutes++;
          flag = true;
        }
        grid[temp.x][temp.y + 1] = 2;

        queue.push({ x: temp.x, y: temp.y + 1 }); // Push this cell to queue
      }

      // Check bottom adjacent cell if it can be rotten
      if (
        boundaryCheck(temp.x, temp.y - 1, R, C) &&
        grid[temp.x][temp.y - 1] == 1
      ) {
        if (!flag) {
          minutes++;
          flag = true;
        }
        grid[temp.x][temp.y - 1] = 2;
        queue.push({ x: temp.x, y: temp.y - 1 }); // push this cell to queue
      }

      queue.shift();
    }

    //   // Pop the delimiter
    queue.shift();

    // if queue is not empty redo the whole process
    if (queue.length > 0) {
      queue.push(delimiter);
    }
  }

  // Return -1 if all tomatoes could not rot, otherwise -1.
  return isFresh(grid, R) ? -1 : minutes;
}

module.exports = rottenTomatoes;
