function rottenTomatoes(grid) {
    if (!Array.isArray(grid)) {
        throw Error("Unsupported data format");
    }

    const ROW_LEN = grid.length;
    const COL_LEN = grid[0].length;
    // variable to be used later
    let minute = 0;
    let row;
    let col;
    let rotten;
    let rottenCount;

    // Helper function to mark infected adjacent tomatoes
    function markRotten(row, col) {

        if (row < 0 || row >= ROW_LEN || col < 0 || col >= COL_LEN || grid[row][col] !== 1) {
            return false;
        }
        grid[row][col] = 2;
        return true;
    }

    // Helper function to find rotten tomatoes
    function searchRotten() {
        let queue = [];
        for (let i = 0; i < ROW_LEN; i++) {
            for (let j = 0; j < COL_LEN; j++) {
                if (grid[i][j] !== 2) {
                    continue;
                }
                grid[i][j] = "#";
                queue.push([i, j]);
            }
        }
        return queue;
    }

    do {
        rotten = searchRotten();
        rottenCount = 0;

        if (rotten.length > 0) {
            rotten.forEach((index) => {
                [row, col] = index;

                rottenCount += markRotten(row + 1, col)? 1 : 0;
                rottenCount += markRotten(row - 1, col)? 1 : 0;
                rottenCount += markRotten(row, col + 1)? 1 : 0;
                rottenCount += markRotten(row, col - 1)? 1 : 0;
            });
            minute += rottenCount? 1 : 0;
        }
    } while (rotten.length > 0)

    let logic = grid.flat(Infinity).some(function(val) {
        return val === 1;
    });

    return logic? -1 : minute;
}

module.exports = rottenTomatoes;
