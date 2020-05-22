//helper function

function findFresh(map) {
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            if (map[row][column] == 1) {
                //check that there is a fresh tomato that can be rottened
                //up
                if (row - 1 >= 0) {
                    if (map[row - 1][column] == 2) {
                        return true;
                    }
                }
                //down
                if (row + 1 < map.length) {
                    if (map[row + 1][column] == 2) {
                        return true;
                    }
                }
                //left
                if (column - 1 >= 0) {
                    if (map[row][column - 1] == 2) {
                        return true;
                    }
                }
                //right
                if (column + 1 < map[row].length) {
                    if (map[row][column + 1] == 2) {
                        return true;
                    }
                }
            }

        }
    }
    return false;
}

function makeRotten(map, array) {
    while (array.length != 0) {
        //take first 2 indexes as x and y cordinates of the grid and make rotten
        var row = array[0];
        var column = array[1];
        map[row][column] = 2;
        //revove first 2 making the next 2 the cordinates
        array.shift();
        array.shift();
    }
}

function rottenTomatoes(grid) {
    //declaring variables
    var rotten = 2;
    var fresh = 1;
    var minutes = 0;
    var queue = [];

    while (findFresh(grid)) {
        for (let row = 0; row < grid.length; row++) {
            for (let column = 0; column < grid[row].length; column++) {
                if (grid[row][column] == rotten) {
                    //check around it for fresh and push the cordinates into a queue
                    //up
                    if (row - 1 >= 0) {
                        if (grid[row - 1][column] == fresh) {
                            queue.push(row - 1);
                            queue.push(column);
                        }
                    }
                    //down
                    if (row + 1 < grid.length) {
                        if (grid[row + 1][column] == fresh) {
                            queue.push(row + 1);
                            queue.push(column);
                        }
                    }
                    //left
                    if (column - 1 >= 0) {
                        if (grid[row][column - 1] == fresh) {
                            queue.push(row);
                            queue.push(column - 1);
                        }
                    }
                    //right
                    if (column + 1 < grid[row].length) {
                        if (grid[row][column + 1] == fresh) {
                            queue.push(row);
                            queue.push(column + 1);
                        }
                    }
                }

            }
        }
        //increment minutes as we have gone through the grid
        minutes += 1;
        //make all fresh next for rotten become rotten
        makeRotten(grid, queue);

    }
    //check if any fresh tomatoe is left
    for (let row = 0; row < grid.length; row++) {
        if (grid[row].includes(1)) {
            return -1;
        }
    }
    //return number of minutes
    return minutes;
}

module.exports = rottenTomatoes;
