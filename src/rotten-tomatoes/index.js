function rottenTomatoes(grid) {
  const rowSize = grid.length;
  const columnSize = grid[0].length;

  function getGridItem(row, column) {
    return grid[parseInt(row)][parseInt(column)];
  }

  let time = 0;

  let startingNodes = [];

  let vistedNodes = [];

  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      if (getGridItem(row, column) === 2) {
        startingNodes.push([row, column]);
      }
    }
  }

  // console.log(startingNodes);

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

  for (let start of startingNodes) {
    if (!checkForArray(vistedNodes, start)) {
      let queue = [];

      queue.push(start);

      while (queue.length > 0) {
        vistedNodes.push(queue[0]);

        let adjacents = getAdjacents(queue[0]);

        for (let node of adjacents) {
          if (
            getGridItem(node[0], node[1]) > 0 &&
            !checkForArray(vistedNodes, node)
          ) {
            queue.push(node);
          }
        }

        queue.shift();
      }
    }
  }

  // function checkNode(array) {
  //   let adjacentList = [];

  //   for (let each of array) {
  //     vistedNodes.push(each);

  //     const adjacent = getAdjacents(each);

  //     for (let node of adjacent) {
  //       if (
  //         getGridItem(node[0], node[1]) > 0 &&
  //         !checkForArray(vistedNodes, node)
  //       ) {
  //         adjacentList.push(node);
  //       }
  //     }
  //   }

  //   time++;

  //   if (adjacentList.length > 0) {
  //     checkNode(adjacentList);
  //     // time++;
  //   }
  // }

  // for (let start of startingNodes) {
  //   if (!checkForArray(vistedNodes, start)) {
  //     vistedNodes.push(start);
  //     checkNode([start]);
  //     //  console.log(vistedNodes);
  //   }
  // }

  return time;
}

module.exports = rottenTomatoes;
