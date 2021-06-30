function rottenTomatoes(grid) {
    let number_of_minutes = 0;
    let rows = grid.length
    let columns = grid[0].length;

    function rottAdjacentTomatoes(row, col, total_rows, total_columns, grid) {
        // rot fresh tomatoes adjacent ( horizontally and vertically )


        // rot  fresh tomatoe above
        if ((row - 1) >= 0 && grid[row - 1][col] == 1) {
            grid[row - 1][col] = 2;
        }

        // rot fresh tomatoe below
        if ((row + 1) < total_rows && grid[row + 1][col] == 1) {
            grid[row + 1][col] = 2;
        }


        // if there is no element right
        if ((col + 1) < total_columns && grid[row][col + 1] == 1) {
            grid[row][col + 1] = 2
        }


        // if there is no element left
        if ((col - 1) >= 0 && grid[row][col - 1] == 1) {
            grid[row][col - 1] = 2;
        }
    }


    let hasFreshNeighbor = (row, col, total_rows, total_columns, grid) => { // check for fresh tomatoe - above
        if ((row - 1) >= 0 && grid[row - 1][col] == 1) {
            return true
        }

        // check for fresh tomatoe - below
        if ((row + 1) < total_rows && grid[row + 1][col] == 1) {
            return true
        }


        // check for fresh tomatoe - right
        if ((col + 1) < total_columns && grid[row][col + 1] == 1) {
            return true
        }

        // check for fresh tomatoe - left
        if ((col - 1) >= 0 && grid[row][col - 1] == 1) {
            return true
        }

        return false;

    }

    // get rotten tomatoes with fresh neighbours
    let getRottenTomatoesWithFreshNeighbors = () => {
        let rottenTomatoesWithFreshNeighbor = []
        // count number rotten tomatoes with fresh neighbours
        grid.forEach((currentArray, row) => {
            currentArray.forEach((currentPosition, col) => {
                if (currentPosition == 2 && hasFreshNeighbor(row, col, rows, columns, grid)) {
                    rottenTomatoesWithFreshNeighbor.push([row, col]);
                }
            })
        })

        return rottenTomatoesWithFreshNeighbor;

    }

    while (true) {
        // keep loop running
        /** As long as there is rotten tomatoes with fresh tomatoe neighbors
     * The loop keeps running
     */
        let rotten_tomatoe_with_freshNeighbor = getRottenTomatoesWithFreshNeighbors();
        if (rotten_tomatoe_with_freshNeighbor.length > 0) {
            //iterate through the rotten tomatoes coordinates.
            rotten_tomatoe_with_freshNeighbor.forEach( rottenTomatoeCoordinate=>{
                let [x,y] = rottenTomatoeCoordinate;
                rottAdjacentTomatoes(x, y, rows, columns, grid);
            })
            number_of_minutes++;
        } else { // No more tomatoes with  with fresh tomatoe neighbors
            break // break out of loop
        }

    }
    // end while

    // check if grid still contains fresh tomatoes
    let stillHasFreshTomatoes = grid.some((subArray) => {
        return subArray.some(current_cell => current_cell === 1)
    });

    return stillHasFreshTomatoes ? -1 : number_of_minutes;
}

console.log(rottenTomatoes([
    [
        2, 1, 1
    ],
    [
        0, 1, 1
    ],
    [
        1, 0, 1
    ],
]));


module.exports = rottenTomatoes;
