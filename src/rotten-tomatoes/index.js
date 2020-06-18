const rottenTomatoes = grid => {

// lookup my neigbours
  const checkAround = (r, c, newVal) => {
    if ((r > 0 && grid[r - 1][c] == newVal) ||
      (r < grid.length - 1 && grid[r + 1][c] == newVal) ||
      (c > 0 && grid[r][c - 1] == newVal) ||
      (c < grid[0].length - 1 && grid[r][c + 1] == newVal)) {
      grid[r][c] = newVal + 1;  
      changeTracker++;
    }
  }

  for (let minutes = 0;; minutes++) {
    var changeTracker = 0;
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] == 1) {
          let newVal = minutes + 2;
          checkAround(r, c, newVal)
        }
      }
    }

    if (!changeTracker) {
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
          if (grid[r][c] == 1) {
            return -1;
          }
        }
      }
      return minutes;
    }
  }
};

module.exports = rottenTomatoes;
