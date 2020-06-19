const rottenTomatoes = (grid) => {
    let queue = [];
    let row = grid.length;
    let col = grid[0].length;
    let fresh = 0;

    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            if (grid[i][j] === 2) queue.push([i, j]);
            if (grid[i][j] === 1) fresh++;
        }
    }
    let timer = 0;
    while (queue.length) {
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const [a, b] = queue.shift();
            if (a - 1 >= 0 && grid[a - 1][b] === 1) {
                grid[a - 1][b] = 2;
                fresh--;
                queue.push([a - 1, b]);
            }
            if (a + 1 < row && grid[a + 1][b] === 1) {
                grid[a + 1][b] = 2;
                fresh--;
                queue.push([a + 1, b]);
            }
            if (b - 1 >= 0 && grid[a][b - 1] === 1) {
                grid[a][b - 1] = 2;
                fresh--;
                queue.push([a, b - 1]);
            }
            if (b + 1 < col && grid[a][b + 1] === 1) {
                grid[a][b + 1] = 2;
                fresh--;
                queue.push([a, b + 1]);
            }
        }
        if (queue.length > 0) timer++;
    }
  return fresh === 0 ? timer : -1;
}
module.exports = rottenTomatoes;