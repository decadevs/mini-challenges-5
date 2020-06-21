function rottenTomatoes(grid) {
    let queue = [];
    let timeTaken = 0;
    let noOfFreshTomato = 0;
    for (let row = 0; row < grid.length; ++row) {
        for (let col = 0; col < grid[0].length; ++col) {
            if (grid[row][col] == 1) noOfFreshTomato++;
            if (grid[row][col] == 2) queue.push([row, col]);
        }
    }

    while (queue.length != 0 && noOfFreshTomato) {
        let rowDirection = [0, -1, 0, 1];
        let colDirection = [-1, 0, 1, 0];

        let tracker = [];
        while (queue.length != 0) {
            let current = queue.shift();
            for (let i = 0; i < 4; ++i) {
                let rowMovement = current[0] + rowDirection[i];
                let colMovement = current[1] + colDirection[i];
                if (
                    rowMovement >= 0 &&
                    colMovement >= 0 &&
                    rowMovement < grid.length &&
                    colMovement < grid[0].length
                ) {
                    if (grid[rowMovement][colMovement] == 1) {
                        grid[rowMovement][colMovement] = 2;
                        noOfFreshTomato--;
                        tracker.push([rowMovement, colMovement]);
                    }
                }
            }
        }
        timeTaken++;
        queue = tracker;
    }

    return noOfFreshTomato === 0 ? timeTaken : -1;
}

module.exports = rottenTomatoes;
