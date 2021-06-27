function rottenTomatoes(grid) {
    let number_of_minutes = 0;
    let fresh_tomatoe_count = 0;
    let rows = grid.length
    let columns = grid[0].length;

    function rottAdjacentTomatoes(row,col,total_rows, total_columns, grid){
       //rot fresh tomatoes adjacent ( horizontally and vertically )

       //rot  fresh tomatoe above
       if( (row-1) >= 0  && grid[row-1][col] ==1 ){ 
        grid[row-1][col] = 2; }

       //rot fresh tomatoe below
       if( (row+1) < total_rows && grid[row+1][col]==1){ 
        grid[row+1][col] = 2; }


       //if there is no element right
       if( (col+1) < total_columns && grid[row][col+1]==1){ 
        grid[row][col+1] = 2 }


       //if there is no element left
       if( (col-1) >=0  && grid[row][col-1]==1 ){ 
        grid[row][col-1] = 2; }
    }

      

    let hasFreshNeighbor = (row, col, total_rows, total_columns, grid)=>{
        //check for fresh tomatoe - above
       if( (row-1) >= 0  && grid[row-1][col] ==1 ){ 
            return true
         }

         //check for fresh tomatoe - below
       else if( (row+1) < total_rows && grid[row+1][col]==1){ 
            return true }


        //check for fresh tomatoe - right
       else if( (col+1) < total_columns && grid[row][col+1]==1){ 
            return true }

        //check for fresh tomatoe - left 
       else if( (col-1) >=0  && grid[row][col-1]==1 ){ 
            return true }

        else { //
            return false;
        }
    }

    //get rotten tomatoes with fresh neighbours
    let getRottenTomatoesWithFreshNeighbors = () =>{
            let rottenTomatoesWithFreshNeighbor = []
            //count number rotten tomatoes with fresh neighbours
            for( let row = 0; row < rows; row++){
                for( let col = 0; col < columns; col++){
                    let currentPosition = grid[row][col];
                    if( currentPosition == 2){
                        if ( hasFreshNeighbor(row,col, rows, columns, grid)){
                            rottenTomatoesWithFreshNeighbor.push( [row,col])
                        }
                    }//end if
                }
            }//end outer forloop
        return rottenTomatoesWithFreshNeighbor;
        }

while(true){//keep loop running
    /** As long as there is rotten tomatoes with fresh tomatoe neighbors
     * The loop keeps running
     */
    let rotten_tomatoe_with_freshNeighbor = getRottenTomatoesWithFreshNeighbors();
    if( rotten_tomatoe_with_freshNeighbor.length > 0){
        for( let rotten_tomatoe of rotten_tomatoe_with_freshNeighbor){
            let element_row = rotten_tomatoe[0];
            let element_column = rotten_tomatoe[1];
            rottAdjacentTomatoes(element_row, element_column, rows, columns, grid);
        }
        number_of_minutes++;
    }
    else { //No more tomatoes with  with fresh tomatoe neighbors
        break //break out of loop
    }

} //end while

//count number of fresh tomatoes left
for( let row = 0; row < rows; row++){
    for( let col = 0; col < columns; col++){
        let currentPosition = grid[row][col];
        console.log(currentPosition)
        if( currentPosition == 1){
            fresh_tomatoe_count++;

        }//end if
    }
}//end outer forloop

    if(fresh_tomatoe_count){
        //if fresh tomatoe still exist in the array, return -1
        return -1;
    }
    else{
        //return number of minutes
        return number_of_minutes;
    } 

}



module.exports = rottenTomatoes;
