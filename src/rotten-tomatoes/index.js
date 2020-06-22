const isValid = (x, y, grid) => {
  if (x < 0 || x >= grid.length) return false;

  if (y < 0 || y >= grid[x].length) return false;

  if (grid[x][y] === 2 || grid[x][y] == 0) return false;

  return true;
};

const bfs = (rows, columns, grid) => {
  let timeFrame = new Map();

  const queueX = [];
  const queueY = [];

  for (let i = 0; i < rows.length; i++) {
    queueX.push(rows[i]);
    queueY.push(columns[i]);

    timeFrame.set(`${rows[i]}${columns[i]}`, 0);
  }

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  while (queueX.length > 0 && queueY.length > 0) {
    const currX = queueX.shift();
    const currY = queueY.shift();

    for (let i = 0; i < 4; i++) {
      if (isValid(currX + dx[i], currY + dy[i], grid)) {
        const newCurrX = currX + dx[i];
        const newCurrY = currY + dy[i];

        if (grid[newCurrX][newCurrY] == 1) {
          grid[newCurrX][newCurrY] = 2;

          const currentTime = timeFrame.get(`${currX}${currY}`);

          timeFrame.set(`${newCurrX}${newCurrY}`, currentTime + 1);

          queueX.push(newCurrX);
          queueY.push(newCurrY);
        }
      }
    }
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const tomatoes = grid[i][j];

      if (tomatoes === 1) {
        return -1;
      }
    }
  }
  const time = [...timeFrame.values()];
  return time[time.length - 1];
};

function rottenTomatoes(grid) {
  const rows = [];
  const columns = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const tomatoes = grid[i][j];

      if (tomatoes === 2) {
        rows.push(i);
        columns.push(j);
      }
    }
  }
  const result = bfs(rows, columns, grid);
  return result;
}

module.exports = rottenTomatoes;
