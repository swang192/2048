app.factory("twenty48Factory", function() {

	/*2048 is played on a gray 4×4 grid, with numbered tiles that slide smoothly 
	when a player moves them using the four arrow keys.[9] Every turn, a new tile 
	will randomly appear in an empty spot on the board with a value of either 2 or 4.
	[5] Tiles slide as far as possible in the chosen direction until they are stopped 
	by either another tile or the edge of the grid. If two tiles of the same number 
	collide while moving, they will merge into a tile with the total value of the two 
	tiles that collided.[16][19] The resulting tile cannot merge with another tile 
	again in the same move. Higher-scoring tiles emit a soft glow.
	*/

	var board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];

	var empty; //Array of empty cells

	var currScore = 0;
	var highScore = 0;
	var status = "Running";

	var factory = {};

	function rand(max, min) {
		//Returns random integer between max and min, inclusive
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getFreeCells() {
		//Returns an array of free cells for spawning new pieces
		var cells = [];
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (board[i][j] === 0) {
					cells.push([i, j]);	
				}				
			}
		}
		return cells;
	}

	function noMoves() {
		//Check if any merges can be done
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				//Check left
				if (j > 0 && board[i][j] === board[i][j - 1]) {
					return false;
				}
				//Check up
				if (i > 0 && board[i][j] === board[i - 1][j]) {
					return false;
				}
				//Check right
				if (j < 3 && board[i][j] === board[i][j + 1]) {
					return false;
				}
				//Check down
				if (i < 3 && board[i][j] === board[i + 1][j]) {
					return false;
				}
			}
		}
		return true;
	}


	factory.init = function() {
		//Reset board
		currScore = 0;
		status = "Running";
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				board[i][j] = 0;
			}
		}
		//Choose 2 random places to place initial numbers
		var rVal = rand(3, 0);
		var cVal = rand(3, 0);
		board[rVal][cVal] = Math.random() < 0.5 ? 2 : 4;

		while(board[rVal][cVal] !== 0) {
			rVal = rand(3, 0);
			cVal = rand(3, 0);
		}
		board[rVal][cVal] = Math.random() < 0.5 ? 2 : 4;
		return board;
	};	


	factory.getBoard = function() {
		return board;
	};

	factory.getStatus = function() {
		return status;
	};

	factory.getCurrScore = function() {
		return currScore;
	};

	factory.getHighScore = function() {
		return highScore;
	};

	factory.makeMove = function(dir) {
		var merged;
		if (dir === 37) { //LEFT
			for (var row = 0; row < 4; row++) {
				var merged = false;
				for (var col = 1; col < 4; col++) {
					//For each cell starting at index 1, move cell to the left until it merges with another or until it reaches the end
					var tempCol = col;
					while (tempCol !== 0) {
						if (board[row][tempCol - 1] === 0) {
							board[row][tempCol - 1] = board[row][tempCol];
							board[row][tempCol] = 0;	
						}
						else if (board[row][tempCol - 1] === board[row][tempCol] && !merged) {
							currScore += board[row][tempCol];
							board[row][tempCol - 1] += board[row][tempCol];
							board[row][tempCol] = 0;
							//Check for Win condition
							if(board[row][tempCol - 1] === 2048) {
								status = "Win";
							}
							merged = true;
							continue;
						}
						tempCol--;
					}

				}
			}
		}
		else if (dir === 38) { //UP
			for (var col = 0; col < 4; col++) { 
				var merged = false;
				for (var row = 1; row < 4; row++) { 
					//For each cell starting at index 1, move cell to the left until it merges with another or until it reaches the end
					var tempRow = row;
					while (tempRow !== 0) {
		
						if (board[tempRow - 1][col] === 0) {
							board[tempRow - 1][col] = board[tempRow][col];
							board[tempRow][col] = 0;	
						}
						else if (board[tempRow - 1][col] === board[tempRow][col] && !merged) {
							currScore += board[tempRow][col];
							board[tempRow - 1][col] += board[tempRow][col];
							board[tempRow][col] = 0;
							//Check for Win condition
							if(board[tempRow - 1][col] === 2048) {
								status = "Win";
							}
							merged = true;
							continue;
						}
						tempRow--;
					}
				}
			}
		}
		else if (dir === 39) { //RIGHT
			for (var row = 0; row < 4; row++) {
				var merged = false;
				for (var col = 2; col >= 0; col--) {
					//For each cell starting at index 1, move cell to the left until it merges with another or until it reaches the end
					var tempCol = col;
					while (tempCol !== 3) {
						
						if (board[row][tempCol + 1] === 0) {
							board[row][tempCol + 1] = board[row][tempCol];
							board[row][tempCol] = 0;	
						}
						else if (board[row][tempCol + 1] === board[row][tempCol] && !merged) {
							currScore += board[row][tempCol];
							board[row][tempCol + 1] += board[row][tempCol];
							board[row][tempCol] = 0;
							//Check for Win condition
							if(board[row][tempCol + 1] === 2048) {
								status = "Win";
							}
							merged = true;
							continue;
						}
						tempCol++;	
					}
				}
			}
		}
		else { //DOWN			
			for (var col = 0; col < 4; col++) {
				var merged = false;
				for (var row = 2; row >= 0; row--) {
					//For each cell starting at index 1, move cell to the left until it merges with another or until it reaches the end
					var tempRow = row;
					while (tempRow !== 3) {
						
						if (board[tempRow + 1][col] === 0) {
							board[tempRow + 1][col] = board[tempRow][col];
							board[tempRow][col] = 0;	
						}
						else if (board[tempRow + 1][col] === board[tempRow][col] && !merged) {
							currScore += board[tempRow][col];
							board[tempRow + 1][col] += board[tempRow][col];
							board[tempRow][col] = 0;
							//Check for Win condition
							if(board[tempRow + 1][col] === 2048) {
								status = "Win";
							}
							merged = true;
							continue;
						}
						tempRow++;
					}
				}
			}
		}
		//Update Score
		if (currScore >= highScore) {
			highScore = currScore;
		}

		//Add new cell
		var cells = getFreeCells();
		if (cells.length > 0) {
			var randFreeCell = cells[rand(0, cells.length - 1)];
			board[randFreeCell[0]][randFreeCell[1]] = Math.random() < 0.5 ? 2 : 4;
		}
		//If board is filled, check if moves can still be made. If not, game over. 
		if (cells.length - 1 === 0) {
			if (noMoves()) {
				console.log("Over");
				status = "Over";
				return board;
			}
		}   

		return board;
	};


	return factory;
});