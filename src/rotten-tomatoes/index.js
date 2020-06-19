function rottenTomatoes(grid) {
    let row = grid.length;
    let columns = grid[0].length;
    let freshTomatoes = 0; // number of freshTomatoes 
    let rottenArr = []; // location of all rotten tomatoes i.e: [0,0]
    let minuteCount = 0;

    // number of fresh tomatoes and location of rotten tomatoes
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < columns; j++) {
            if (grid[i][j] === 1) { // if its one then its a fresh tomato
                freshTomatoes++;
            } else if (grid[i][j] === 2) { // if its 2 its rotten so push to the rotten array
                rottenArr.push([i, j]);
            }
        }
    }
    // 4 directions : down up right left
    let dir = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];

    //while we still have rotten and fresh tomatoes
    while (rottenArr.length !== 0 && freshTomatoes) {
        let CurrentRottenTom = rottenArr.length; // number of rotten tomatoes atm
        while (CurrentRottenTom) {
            let [r, c] = rottenArr.shift();
            const r1 = [r, c][0];
            const c1 = [r, c][1];
            //check 4 directions
            for (let d = 0; d < 4; d++) {
                const r2 = r1 + dir[d][0];
                const c2 = c1 + dir[d][1];
                //continue if the there is no fresh tomatoes in all the directions
                if (r2 < 0 || r2 >= row || c2 < 0 || c2 >= columns ||
                    grid[r2][c2] !== 1) {
                    continue;
                }
                // fresh tomatoes that got rotten
                freshTomatoes--;
                grid[r2][c2] = 2;
                // add new location of rotten tomatoes into the rotten arr
                rottenArr.push([r2, c2]);
            }
            CurrentRottenTom--
        }
        //increase the minutes after all rotten tomatoes have moved
        minuteCount++;
    }
    if (freshTomatoes) {
        return -1
    } else {
        return minuteCount;
    }

}

const grid = [
    [2, 1, 1],
    [2, 1, 1],
    [2, 1, 1],
    [1, 1, 0],
    [1, 1, 0],
    [1, 1, 0],
    [0, 1, 1],
    [0, 1, 1],
    [0, 1, 1],
];
console.log(rottenTomatoes(grid));


module.exports = rottenTomatoes;