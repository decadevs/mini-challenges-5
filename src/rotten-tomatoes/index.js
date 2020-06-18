function rottenTomatoes(grid) {
  if(grid.length == 0) return 0;

    let freshOranges = 0;
    let queue = [];
    for(let rowIndex = 0; rowIndex < grid.length; rowIndex++){
      for(let colIndex = 0; colIndex < grid[0].length; colIndex++){
        if(grid[rowIndex][colIndex] == 2) queue.push([rowIndex,colIndex]);
        if(grid[rowIndex][colIndex] == 1) freshOranges += 1;
      }
    }
   if(!queue.length){
      if(freshOranges > 0){
        return -1;
      }else{
        return 0;
      }
     }

    let timeCounter = 0;
    const directions = [[0,1],[0,-1],[1,0],[-1,0]]
    let newQ = []

    while(queue.length){
      let [row, col] = queue.shift();
      for(let [row1, col1] of directions){
        let row2 = row + row1;
        let col2 = col + col1;
        if(row2 >= 0 && row2 < grid.length && col2 >= 0 && col2 < grid[0].length  && grid[row2][col2] == 1){
          grid[row2][col2] = 2;
          freshOranges -= 1;
          newQ.push([row2, col2])
        }
      }
      if(!queue.length){
        timeCounter += 1;
        queue = newQ;
        newQ = [];
      }
    }
    if(freshOranges == 0) {
      return timeCounter - 1
    }
    else {
      return -1
    }
}

module.exports = rottenTomatoes;
