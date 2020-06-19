function rottenTomatoes(grid) {
    let time = 0;
    let level = [];
    let queue = [];
    let freshTomato = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 1) {
                freshTomato++;
            }
            if (grid[i][j] === 2) {
                queue.push([i, j]);
            }
        }
    }

    while (queue.length && freshTomato) {
        level = [];

        while (queue.length) {
            let [x, y] = queue.shift();
            rotNeighbors(x, y);
        }

        time++;
        queue = level;
    }

    if (freshTomato !== 0) {
        return -1
    }
    return time;

    function rotNeighbors(i, j) {
        if (grid[i][j + 1] === 1) {
            freshTomato--;
            grid[i][j + 1] = 2;
            level.push([i, j + 1]);
        }

        if (grid[i][j - 1] === 1) {
            freshTomato--;
            grid[i][j - 1] = 2;
            level.push([i, j - 1]);
        }


        if (grid[i - 1] && grid[i - 1][j] === 1) {
            freshTomato--;
            grid[i - 1][j] = 2;
            level.push([i - 1, j]);
        }


        if (grid[i + 1] && grid[i + 1][j] === 1) {
            freshTomato--;
            grid[i + 1][j] = 2;
            level.push([i + 1, j]);
        }
    }
}

module.exports = rottenTomatoes;