function rottenTomatoes(grid) {

    //  Initialize array of adjacents of each tomato
    let adjacents = [];
    //  Initialize grid of adjacents according to the grid of tomatoes
    let adjacentsArr = []
    //  Initialize queue to use for Breadth First Search
    let queue = []
    //  Initialize count to track number of minutes
    let count = 0

    //  Generate a grid of adjacent positions of each tomato
    for (let row = 0; row < grid.length; row++){
        let rowAdjacentArr = []
        for (let column = 0; column < grid[row].length; column++){
            adjacents = adjacent(grid.length, grid[row].length, [row, column]);
            let refinedAdjacents = []
            for (const position of adjacents){
                if (position[0] < grid.length && position[1] < grid[0].length){
                    refinedAdjacents.push(position)
                }
            }
            rowAdjacentArr.push(refinedAdjacents)
        }
        adjacentsArr.push(rowAdjacentArr)
    }
    
    //  Locate all rotten tomatoes, queue them at the same level and record their location as visited
    let visited = []
    let initialRottenTomatoesAdjacents = []
    for (let row = 0; row < grid.length; row++){
        for (let column = 0; column < grid[row].length; column++){
            if (grid[row][column] === 2){
                initialRottenTomatoesAdjacents.push(adjacentsArr[row][column])
                visited.push([row, column])
            }
        }
    }
    flattened = initialRottenTomatoesAdjacents.flat()
    queue.push(flattened)

    //  Use Breadth First Search function to count minutes, traverse and update the grid
    const result = BFS(count, adjacentsArr, queue, grid, visited)
    count += result[0]
    grid = result[1]

    //  Return -1 if there is any tomato that will never be rotten ie, shielded/immune tomatoe exist.
    for (let row = 0; row < grid.length; row++){
        for (let column = 0; column < grid[row].length; column++){
            if (grid[row][column] === 1){
                let immuneAdjacents = 0
                for (const position of adjacentsArr[row][column]){
                    if (grid[position[0]][position[1]] === 0 || grid[position[0]][position[1]] === 1){
                        immuneAdjacents++
                    }
                }
                if (immuneAdjacents === adjacentsArr[row][column].length){
                    return -1
                }
            }
        }
    }
    return count;
}

// Helpers Functions

//  Function to fetch the adjacent positions of each tomato in the grid
function adjacent(rowLength, columnLength, position){
    const top = position[0]===0 ? false : [position[0]-1, position[1]]
    const bottom = position[0]===rowLength ? false : [position[0]+1, position[1]]
    const right = position[1]===columnLength ? false : [position[0], position[1]+1]
    const left = position[1]===0 ? false : [position[0], position[1]-1]
    
    return [right, left, bottom, top].filter(Boolean);
}

//  Breadth First Search function to count minutes, traverse and update the grid
function BFS(count, allAdjacents, queue, grid, visited){

    //  Queue up the adjacent positions of the current level being treated
    let adjacentArr = queue[0]
    nextLevel = []
    let checkCount = 0
    for (const position of adjacentArr){
        if (grid[position[0]][position[1]] === 1 && isVisited(position, visited) === false){
            checkCount++
            grid[position[0]][position[1]] = 2
            nextLevel.push(allAdjacents[position[0]][position[1]])
        }
    }
    nextLevel = nextLevel.flat()
    queue.push(nextLevel)

    //  Update visited positions and remove the position you have attended to from the queue
    const shifted = queue.shift()
    for (const position of shifted){
        if (isVisited(position, visited) === false)
            visited.push(position)
    }
    if (checkCount > 0)
        count++

    //  Termination point of this recursive BFS function
    if (queue.flat().length === 0){
        return [count, grid]
    }
    
    //  Repeat the process if termination condition is yet to be met
    let result = BFS(count, allAdjacents, queue, grid, visited)
    return result;
}

//  Function to check if a position has been visited
function isVisited(position, visitedPositions){
    for (const spot of visitedPositions){
        if (spot.toString() === position.toString())
            return true
    }
    return false
}

module.exports = rottenTomatoes;
