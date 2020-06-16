function rottenTomatoes(grid) {
  var minutes=0;

  function identifyRottenTomatoes(grid){
    let rottenTomatoesPosition ={};
    let  rottenTomatoesRow=[];
    let  rottenTomatoesCol=[];

    for(let row=0; row<grid.length; row++){
      for(let col=0; col<grid[row].length; col++){
        if(grid[row][col]===2){
          rottenTomatoesPosition.row=col;
          rottenTomatoesRow.push(row);
          rottenTomatoesCol.push(col);
        }

      }
    }
    return {"R":rottenTomatoesRow, "c":rottenTomatoesCol}
  }

  function checkAdjacentFleshTomato(grid,gt){

    for(let a=0; a<gt.R.length; a++){

      if(gt.R[a]+1<=grid.length && grid[gt.R[a]+1]!==undefined && grid[gt.R[a]+1][gt.c[a]]==1){
        grid[gt.R[a]+1][gt.c[a]]=2;
        grid[gt.R[a]][gt.c[a]]=0;
      }
      if(gt.R[a]-1>=0 &&  grid[gt.R[a]-1]!==undefined && grid[gt.R[a]-1][gt.c[a]]==1){
        grid[gt.R[a]-1][gt.c[a]]=2;
        grid[gt.R[a]][gt.c[a]]=0;
      }
      if(gt.c[a]-1>=0 && grid[gt.R[a]][gt.c[a]-1]!=undefined && grid[gt.R[a]][gt.c[a]-1]==1){
        grid[gt.R[a]][gt.c[a]-1]=2;
        grid[gt.R[a]][gt.c[a]]=0;
      }
      if(gt.c[a]+1<=grid[0].length && grid[gt.R[a]][gt.c[a]+1]!=undefined && grid[gt.R[a]][gt.c[a]+1]==1){
        grid[gt.R[a]][gt.c[a]+1]=2;
        grid[gt.R[a]][gt.c[a]]=0;
      }
      grid[gt.R[a]][gt.c[a]] =0;
    }

    if(identifyRottenTomatoes(grid).c.length !=0){
      minutes++
      checkAdjacentFleshTomato(grid,identifyRottenTomatoes(grid))
    }
  }
  checkAdjacentFleshTomato(grid,identifyRottenTomatoes(grid),0);

//checking unaccessible fresh tomatoe(s), if any.
  let freshRotten=grid.map((rows)=>{
    return Math.max(...rows)
  })
  if(Math.max(...freshRotten)){
    return -1;
  }
  return minutes
}

module.exports = rottenTomatoes;
