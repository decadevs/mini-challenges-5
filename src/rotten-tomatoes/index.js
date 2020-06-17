function rottenTomatoes(grid) {
    function rottenTomatoes(grid) {

        let minuetes = 0;
        let changed;
        for (let row = 0; row < grid.length; row++) {
            for (let column = 0; column < grid[row].length; column++) {
                if (grid[row][column] === 2) {
                     changed = false
                    findFreshTomatoes(grid, row, column);
                }
            }
        }
    
        function findFreshTomatoes(graph, row, column) {
            // check neigbour below    
            if (row + 1 < graph.length && graph[row + 1][column] === 1) {
                graph[row + 1][column] = 2
                changed = true
            }
            // check top neigbour
            if (row - 1 >= 0 && graph[row - 1][column] === 1) {
                graph[row - 1][column] = 2
                changed = true
            }
    
            // check right neigbour
            if (column + 1 < graph[row].length && graph[row][column + 1] === 1) {
                graph[row][column + 1] = 2
                changed = true
            }
    
            // check left neigbour
            if (column - 1 >= 0 && graph[row][column - 1] === 1) {
                graph[row][column - 1] = 2
                changed = true
            }
            if (changed) { minuetes++ }
            console.log(minuetes)
        }
    
    
    // check if there is still a fresh tomato
        for (let row = 0; row < grid.length; row++) {
            for (let column = 0; column < grid[row].length; column++) {
                if (grid[row][column] === 1) {
                    return -1
                   
                }
            }
        }
    
        return minuetes
    }
    
}

module.exports = rottenTomatoes;
