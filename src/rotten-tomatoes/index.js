function rottenTomatoes(grid) {

  let rotten = [];
  let bad = [];
  let noOfFresh = 0;
  let minutes = 1;
  let noOfRottenNow = 0;
  let moreGoodTomatoes = true;

  //Check for good and rotten tomato
  for (let i =0; i < grid.length; i++){
      for(let j = 0; j < grid[0].length; j++){
          if(grid[i][j] === 2){
              rotten.push([i,j])
          } else if(grid[i][j] === 1){
              noOfFresh += 1;
          }
      }
  }

  // Confirm if there is no fresh tomato
  if(noOfFresh === 0) {
    return 0;
  }

  // Confirm if there is no rotten tomato
  if(!rotten.length) {
    return -1;
  }

  while(moreGoodTomatoes) {
      // Check if there is no more tomato to infect in this round
      if (!rotten.length) {
        // Check if there is still fresh tomatoes and new set of tomatoes have been rotten
        if(noOfFresh > 0 && noOfRottenNow > 0) {
          minutes += 1;
          rotten = bad;
          bad = [];
          noOfRottenNow = 0;
        } else {
          return -1;
        }
      }

      //Obtain the row and column of each rotten tomato
      //and turn the adjacent good to new set of infected tomatoes
      let [row, col] = rotten.shift();
      if (row > 0 && grid[row - 1][col] === 1) {
          grid[row - 1][col] = 2;
          noOfFresh = noOfFresh - 1;
          noOfRottenNow = noOfRottenNow + 1;
          bad.push([row - 1,col]);
      }
      if (col > 0 && grid[row][col - 1] === 1) {
          grid[row][col - 1] = 2;
          noOfFresh = noOfFresh - 1;
          noOfRottenNow = noOfRottenNow + 1;
          bad.push([row,col - 1]);
      }
      if (row < grid.length - 1 && grid[row + 1][col] === 1){
          grid[row + 1][col] = 2;
          noOfFresh = noOfFresh - 1;
          noOfRottenNow = noOfRottenNow + 1;
          bad.push([row + 1,col]);
      }
      if(col < grid[0].length - 1 && grid[row][col + 1] === 1){
          grid[row][col + 1] = 2;
          noOfFresh = noOfFresh - 1;
          noOfRottenNow = noOfRottenNow + 1;
          bad.push([row,col + 1]);
      }

      // Check whether all the good tomatoes have been infected.
      if(noOfFresh === 0){
          return minutes;
      }
  }
}

module.exports = rottenTomatoes;
