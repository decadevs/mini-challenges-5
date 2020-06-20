const rottenTomatoes = (grid) => {
    	
	let stack = [];
	let rottenCount = 0;
	let timer = 0;
	
	const markRotten= (row, col) => {
		if(row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && grid[row][col] === 1) {
				grid[row][col] = 2;
				--rottenCount;
				stack.push([row, col]); 
				return true;
		}
		return false;
	}
	
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === 2) {
				stack.push([i,j]);
			}
			if (grid[i][j] === 1){
				++rottenCount;
			}
		}
	}
	while (stack.length){
        let sightsee = [];
        let keepCount = 0;
		sightsee.push(...stack);
		stack = [];
		for (let i = 0; i < sightsee.length; i++) {
			row = sightsee[i][0];
			col = sightsee[i][1];
			grid[row][col] = 0;
			let check = [markRotten(row, col+1), markRotten(row, col-1), markRotten(row-1, col), markRotten(row+1, col)]
			if(check.includes(true)) {
				keepCount = 1;
			}
		}
		timer += keepCount;
	}
	return rottenCount === 0 ? timer : -1;
}

module.exports = rottenTomatoes;