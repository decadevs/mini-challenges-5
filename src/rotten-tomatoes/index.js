function rottenTomatoes(grid) {
  //declared variable minutes and assigned 0 to it
  let minutes = 0;

  //Declared variablefreshTomatoesinTotal and assigned 0 to it
  let freshTomatoesinTotal = 0;

  // Declared rottenTomatoes as an empty array to store rottten Tomatoes
  let rottenTomatoes = [];

  for (let p = 0; p < grid.length; p++) {
    for (let q = 0; q < grid[p].length; q++) {
      if (grid[p][q] === 1) {
        //Counting fresh Tomatoes
        freshTomatoesinTotal++;
      }

      if (grid[p][q] === 2) {
        rottenTomatoes.push([p, q]);
      }
    }
  }

  //Adjacent Grid access
  const gridAcess = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  //if there is freshTomatoesleft and there is rotten Tomatoes
  //left to be spread? Keep Spreading
  while (freshTomatoesinTotal && rottenTomatoes.length) {
    let rottingTomatoes = [];
    while (rottenTomatoes.length) {
      let [x, y] = rottenTomatoes.pop();
      for (let i = 0; i < 4; i++) {
        let [x2, y2] = [x + gridAcess[i][0], y + gridAcess[i][1]];

        // if adjacent grid is fresh Tomatoes:
        if (grid[x2] && grid[x2][y2] === 1) {
          grid[x2][y2] = 2;

          // make it rotten, decrease total fresh Tomatoes
          freshTomatoesinTotal--;

          // and push it into empty array that will be used for
          // next round of speading.
          rottingTomatoes.push([x2, y2]);
        }
      }
    }
    //rotten Tomatoes then continue to spread until it'e left with nothing
    rottenTomatoes = rottingTomatoes;

    minutes++;
  }

  //Here check if there is any fresh Tomatoes left return -1 , else return minutes;
  let result = freshTomatoesinTotal ? -1 : minutes;

  //retur the result declared above
  return result;
}

module.exports = rottenTomatoes;
