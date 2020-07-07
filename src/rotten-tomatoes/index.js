function rottenTomatoes(grid) 
{
	//return -1
let rotten  = [],fresh = [],minutes = 0,infected  = [];
let k=0,newRow,newColumn,position;
let coordinatesModifiers = [[0,-1],[0,1],[-1,0],[1,0]];

for (let i = 0; i < grid.length; i++){
	for (let j = 0; j < grid[0].length; j++){
		if(grid[i][j] === 2 )
			rotten.push([i,j]);
		else if(grid[i][j] === 1 )
			fresh.push([i,j]);
	}
}  
while(rotten.length !=  0){
		//var isInfecting = false  
	for (var i = 0; i < rotten.length; i++) {
		for( k = 0; k < coordinatesModifiers.length; k++){
			newRow = rotten[i][0] + coordinatesModifiers[k][0];
			newColumn = rotten[i][1] + coordinatesModifiers[k][1];
	    	position = [newRow,newColumn];
      
			fresh.forEach((a)=>{
				if(a[0]===position[0] && a[1] === position[1]){
					//isInfecting = true
					infected.push(a);
					fresh.splice(fresh.indexOf(a),1)
				}
			});
	 	}
	}

 	if (infected.length){
 		minutes++;
 		rotten = infected
 		infected = []
 	} else{
 		break
 	}
  //console.log(rotten)
	// if (!isInfecting){
 //        break
 //      }  
}
	if (fresh.length !== 0){
		return -1;
	}
    else{
		return minutes;
	}
}

const g = [
      [2, 1, 1],
      [0, 1, 1],
      [1, 0, 1],
    ];

//console.log(rottenTomatoes(g) );

module.exports = rottenTomatoes;