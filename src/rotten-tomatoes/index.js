function rottenTomatoes(grid) {
  const rowSize = grid.length;
  const columnSize = grid[0].length;

  function getGridItem(row, column) {
    return grid[parseInt(row)][parseInt(column)];
  }

  let time = 0;

  let arrayOfTime = [];

  let startingNodes = [];

  let vistedNodes = [];

  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      if (getGridItem(row, column) === 2) {
        startingNodes.push([row, column]);
      }
    }
  }

  function checkForArray(parentArray, childArray) {
    const child = JSON.stringify(childArray);

    let contains = parentArray.some((point) => JSON.stringify(point) === child);

    return contains;
  }

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

  function checkNode(array) {
    let adjacentList = [];

    while (array.length > 0) {
      vistedNodes.push(array[0]);

      const adjacent = getAdjacents(array[0]);

      for (let node of adjacent) {
        if (
          getGridItem(node[0], node[1]) === 1 &&
          !checkForArray(vistedNodes, node)
        ) {
          adjacentList.push(node);
          grid[node[0]][node[1]] = 2;
        }
      }

      array.shift();
    }

    if (adjacentList.length > 0) {
      checkNode(adjacentList);
      time++;
    }
  }

  for (let start of startingNodes) {
    if (!checkForArray(vistedNodes, start)) {
      time = 0;
      vistedNodes.push(start);
      checkNode([start]);
      arrayOfTime.push(time);
    }
  }

  console.log(arrayOfTime);

  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      if (getGridItem(row, column) === 1) {
        return -1;
      }
    }
  }

  return Math.max.apply(null, arrayOfTime);
}

module.exports = rottenTomatoes;
