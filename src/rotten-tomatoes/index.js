function rottenTomatoes(grid) {
  const rotten = 2;
  const fresh = 1;
  let rottenCoordinate = [];
  let timer = 0;
  let store = [];

   for (let row = 0; row < grid.length; row++) {
     for (let col = 0; col < grid[0].length; col++) {
       grid[row][col] == rotten ? rottenCoordinate.push([row, col]) : false;
     }
   }

   while(rottenCoordinate.length || store.length){
    //  console.log(rottenCoordinate);
     let [rotRow, rotCol] = rottenCoordinate[0];
     if (rotRow + 1 < grid.length && grid[rotRow + 1][rotCol] == fresh) {
       store.push([rotRow + 1,rotCol]);
       grid[rotRow + 1][rotCol] = 2;
     }
     if (rotRow - 1 >= 0 && grid[rotRow - 1][rotCol] == fresh) {
       store.push([
         rotRow - 1,
         rotCol
       ]);
       grid[rotRow - 1][rotCol] = 2;
     }
     if (rotCol + 1 < grid[0].length && grid[rotRow][rotCol + 1] == fresh) {
       store.push([
         rotRow,
         rotCol + 1
       ]);
       grid[rotRow][rotCol + 1] = 2;
      }
     if (rotCol - 1 >= 0 && grid[rotRow][rotCol - 1] == fresh) {
       store.push([
         rotRow,
         rotCol - 1
       ]);
       grid[rotRow][rotCol - 1] = 2;
     }

     rottenCoordinate.shift();
     if (!rottenCoordinate.length) {
       rottenCoordinate = store;
       store = [];
       timer++;
     }
   }

   for (let row = 0; row < grid.length; row++) {
      console.log(grid[row]);

      if (grid[row].includes(fresh)) {
        return -1
      }
   }
   return timer - 1;
}

console.log(rottenTomatoes([
  [2, 1, 1],
  [0, 1, 1],
  [1, 0, 1],
]));

module.exports = rottenTomatoes;



