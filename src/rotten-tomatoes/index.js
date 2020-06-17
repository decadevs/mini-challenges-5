let minuetes = 0;
let visited = [];
  

function rottenTomatoes(grid) {
  let affted = [];
  for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[row].length; column++) {
          if (grid[row][column] === 2 && !JSON.stringify(visited).includes([row,column])) {
              visited.push([row,column])
              findFreshTomatoes(grid,row,column)
          }
      }
      
  }
 
  function findFreshTomatoes(graph, row, column) {
      // check neigbour below    
      if (row + 1 < graph.length && graph[row + 1][column] === 1) {
          affted.push([row+1,column])
      }
      // check top neigbour
      if (row - 1 >= 0 && graph[row - 1][column] === 1) {
         affted.push([row-1,column])
      }

      // check right neigbour
      if (column + 1 < graph[row].length && graph[row][column + 1] === 1) {
          affted.push([row,column+1])
      }

      // check left neigbour
      if (column - 1 >= 0 && graph[row][column - 1] === 1) {
          affted.push([row,column-1])
      }
      
  }

 if(affted.length > 0){
  for(let position of affted){
      grid[position[0]][position[1]] = 2
  }
  minuetes++
  rottenTomatoes(grid)
 }

 //check if it is impossible to infect all the tomatoes
for(let array of grid){
  if(array.includes(1)) return -1
}

return minuetes

}


module.exports = rottenTomatoes;
