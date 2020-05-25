function rottenTomatoes(grid) {
  const rowSize = grid.length;
  const columnSize = grid[0].length;

  // A function of getting the grid item
  function getGridItem(row, column) {
    return grid[parseInt(row)][parseInt(column)];
  }

  // Initializing the time
  let time = 0;

  // Initializing the starting nodes queue
  let startingNodes = [];

  // Initializing the visited nodes queue
  let visitedNodes = [];

  // Getting all the starting nodes
  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      if (getGridItem(row, column) === 2) {
        startingNodes.push([row, column]);
      }
    }
  }

  // Function for checking for the occurence of an array in another array
  function checkForArray(parentArray, childArray) {
    const child = JSON.stringify(childArray);

    let contains = parentArray.some((point) => JSON.stringify(point) === child);

    return contains;
  }

  // Function for getting adjacents nodes of fresh tomatoes (i.e grid positions equal to 1)
  function getAdjacents(position) {
    const [row, column] = position;

    const topAdjacent = row === 0 ? false : [row - 1, column];

    const rightAdjacent = column === columnSize - 1 ? false : [row, column + 1];

    const bottomAdjacent = row === rowSize - 1 ? false : [row + 1, column];

    const leftAdjacent = column === 0 ? false : [row, column - 1];

    return [topAdjacent, rightAdjacent, bottomAdjacent, leftAdjacent].filter(
      Boolean
    );
  }

  // Checking through the starting nodes
  function checkNode(array) {
    let adjacentList = [];

    while (array.length > 0) {
      // Pushing each array to visited nodes
      visitedNodes.push(array[0]);

      // Getting adjacents of each array
      const adjacent = getAdjacents(array[0]);

      // Checking for fresh adjacents tomatoes and already visited nodes and adding to add to queue
      for (let node of adjacent) {
        if (
          getGridItem(node[0], node[1]) === 1 &&
          !checkForArray(visitedNodes, node)
        ) {
          adjacentList.push(node);
          grid[node[0]][node[1]] = 2;
        }
      }

      array.shift();
    }

    // Recursive checking of children nodes
    if (adjacentList.length > 0) {
      checkNode(adjacentList);
      time++;
    }
  }

  checkNode(startingNodes);

  // Returning time for still fresh tomatoes
  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      if (getGridItem(row, column) === 1) {
        return -1;
      }
    }
  }

  return time;
}

module.exports = rottenTomatoes;
