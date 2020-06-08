function rottenTomatoes(grid) {
   
  
    let row = grid.length;
    let col= grid[0].length;
    let visit =  [];
    let count  = 0;
    let check = false;
    
    for (let c = 0; c < grid.length; c++) {

        for (let d = 0; d < grid[c].length; d++) {

            if (grid[c][d] == 2 ) {

                    visit.push([c, d]);
               
            }    
        }        
        
    }


    visit.push([-1, -1]);
    
    while (visit.length != 0) {

       while (!checkVisit()) {

            let cord = visit.shift();
            
            let x = cord[0];
            let y = cord[1];


            if (goodTomatoes(grid, x-1, y)) {
                
                    grid[x-1][y] = 2;
                    visit.push([x-1 , y]);
                
                    if(check == false){
                
                        check = true;
                        count = count + 1;
                
                    }
            
            }


            if (goodTomatoes(grid, x, y-1)) {

                grid[x][y-1] = 2;
                visit.push([x, y-1]);

                if(check == false){

                    check = true;
                    count = count + 1;

                }

            }


            if (goodTomatoes(grid, x+1, y)) {

                    grid[x+1][y] = 2;
                    visit.push([x+1, y]);
                
                    if(check == false){
                
                        check = true;
                        count = count + 1;
                
                
                    }
                    
                }
    

                if (goodTomatoes(grid, x, y+1)) {

                    grid[x][y+1] = 2;
                    visit.push([x, y+1]);

                    if(check == false){

                        check = true;
                        count = count + 1;

                    }
                
                }


    }

                    visit.shift();
                    check = false;
                    if (visit.length != 0) {

                        visit.push([-1, -1]);
                
                    }


 }

            for (let i = 0; i < grid.length; i++) {
                    for (let j = 0; j < grid[i].length; j++) {
                        
                        if (grid[i][j] == 1 ) {
                            count = -1;
            
                        }    
                    }        
                
                }


    return count;

    function checkVisit(){

        let first = visit[0];

        return first[0] == -1;


    }

    
function goodTomatoes(sGrid, sRow, sCol){

    return sRow >= 0 &&  sRow < row  && sCol >= 0 && sCol < col  && sGrid[sRow][sCol] == 1;
    
    }
}

module.exports = rottenTomatoes;
