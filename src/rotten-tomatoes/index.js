function rottenTomatoes(grid) {
  let tempHolder = []
  let rotLevel = []
  let minutes = 0
  //gets all good tomatoes adjacent to rotten tomatoes
  const getAdjacent1 = (index) => {
    let row = index[0]
    let column = index[1]
    const above = grid[row - 1] === undefined ? undefined : grid[row - 1][column]
    const below = grid[row + 1] === undefined ? undefined : grid[row + 1][column]
    const right = grid[row][column + 1]
    const left = grid[row][column - 1]
    if(above === 1) {
      tempHolder.push([row - 1, column])
      grid[row - 1][column] = 0
    }
    if(below === 1) {
      tempHolder.push([row + 1, column])
      grid[row + 1][column] = 0
    }
    if(right === 1) {
      tempHolder.push([row, column + 1])
      grid[row][column + 1] = 0
    }
    if(left === 1) {
      tempHolder.push([row, column - 1])
      grid[row][column - 1] = 0
    }

  }
  //function to expand the level of rot
  const expandRot = (level) => {
    level.forEach(element => {
      getAdjacent1(element)
    });
    rotLevel = [...tempHolder]
    tempHolder = []
  }
//fucntion to search for items in the grid
  const find = num => {
    for (let i = 0; i < grid.length; i += 1) {
      for (let j = 0; j < grid[i].length; j += 1) {
        if (grid[i][j] === num) {
          rotLevel.push([i, j])
          grid[i][j] = 0
        }
      }
    }
  }

//find all the sources of the rot
  find(2)
  //searches for the level of the rot and after every minute
  while (rotLevel.length !== 0) {

    expandRot(rotLevel)
    minutes = rotLevel.length !== 0 ? minutes+ 1 : minutes
  }
//checks if there is any unaffected tomatoes
  find(1)
//updates the time if there are unaffected tomatoes
  if (rotLevel.length !== 0) {
    minutes = -1
  }
//returns the time for complete rot of the tomatoes
  return minutes

}



module.exports = rottenTomatoes;
