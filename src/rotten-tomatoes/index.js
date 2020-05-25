function rottenTomatoes(grid) {
	const rowLen = grid.length
	const colLen = grid[0].length
	let oneCheckers = 0
	let queue = []
	let minutes = 0
	
	function checkers (row, col) {
		if(row >= 0 && row < rowLen && col >= 0 && col < colLen && grid[row][col] === 1) {
				grid[row][col] = 2
				--oneCheckers
				queue.push([row,col]) 
				return true
		}
		return false
	}
	
	for (let row = 0; row < rowLen; row++) {
		for (let col = 0; col < colLen; col++) {
			if (grid[row][col] === 2) {
				queue.push([row,col])
			}
			if (grid[row][col] === 1){
				++oneCheckers
			}
		}
	}
	while (queue.length){
		const visiting = []
		let store = 0
		visiting.push(...queue)
		queue = []
		for (let item = 0; item < visiting.length; item++) {
			row = visiting[item][0]
			col = visiting[item][1]
			grid[row][col] = 0
			let check = [checkers (row, col+1), checkers (row, col-1), checkers (row-1, col), checkers (row+1, col)]
			if(check.includes(true)) {
				store = 1
			}
		}
		minutes += store
	}
	return oneCheckers === 0 ? minutes : -1
}

module.exports = rottenTomatoes;
