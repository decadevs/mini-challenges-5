const rottenTomatoes = (grid) => {
    	
	let file = [];
	let searchCount = 0;
	let numOfMinutes = 0;
	
	const scout = (row, column) => {
		if(row >= 0 && row < grid.length && column >= 0 && column < grid[0].length && grid[row][column] === 1) {
				grid[row][column] = 2;
				--searchCount;
				file.push([row, column]); 
				return true;
		}
		return false;
	}
	
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === 2) {
				file.push([i,j]);
			}
			if (grid[i][j] === 1){
				++searchCount;
			}
		}
	}
	while (file.length){
        let sightsee = [];
        let keeper = 0;
		sightsee.push(...file);
		file = [];
		for (let i = 0; i < sightsee.length; i++) {
			row = sightsee[i][0];
			column = sightsee[i][1];
			grid[row][column] = 0;
			let check = [scout(row, column+1), scout(row, column-1), scout(row-1, column), scout(row+1, column)]
			if(check.includes(true)) {
				keeper = 1;
			}
		}
		numOfMinutes += keeper;
	}
	return searchCount === 0 ? numOfMinutes : -1;
}

module.exports = rottenTomatoes;
