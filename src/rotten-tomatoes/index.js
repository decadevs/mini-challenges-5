function rottenTomatoes(grid) {
    let minuetes = 0;
    let impossible = false
    let affected = [];
    findRottenTomatoes(grid)

    //this function looks for infected or rotten tomatoes and grab thier index
    function findRottenTomatoes(grid) {
        for (let row = 0; row < grid.length; row++) {
            for (let column = 0; column < grid[row].length; column++) {
                if (grid[row][column] === 2) {
                    grid[row][column] = 0
                    findVictims(grid, row, column)
                }
            }

        }

        //This function possible victims of the infect and place all of them into an array called affected   
        function findVictims(graph, row, column) {
            // check top neigbour
            if (row - 1 >= 0 && graph[row - 1][column] === 1) {
                affected.push([row - 1, column])
            }

            // check right neigbour
            if (column + 1 < graph[row].length && graph[row][column + 1] === 1) {
                affected.push([row, column + 1])
            }

            // check neigbour below    
            if (row + 1 < graph.length && graph[row + 1][column] === 1) {
                affected.push([row + 1, column])
            }

            // check left neigbour
            if (column - 1 >= 0 && graph[row][column - 1] === 1) {
                affected.push([row, column - 1])
            }


        }
        //check if there are victims to infect and infect them
        if (affected.length) {
            for (let position of affected) {
                grid[position[0]][position[1]] = 2
            }
            minuetes++
            affected = [];
            findRottenTomatoes(grid)
        }

        //check if it is impossible to infect all the tomatoes
        if (!affected.length) {
            for (let array of grid) {
                if (array.includes(1)) {
                    impossible = true
                    return
                }
            }
        }

    }

    return impossible ? -1 : minuetes

}


module.exports = rottenTomatoes;
