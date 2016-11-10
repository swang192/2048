app.controller("twenty48Controller", ['$scope', 'twenty48Factory', function($scope, twenty48Factory) {

	$scope.gameBoard = [];
	$scope.currScore;
	$scope.highScore = 0;
	$scope.message;

	$scope.newGame = function() {
		$scope.message = "";
		$scope.gameBoard = twenty48Factory.init();
		$scope.currScore = twenty48Factory.getCurrScore();
		$scope.highScore = twenty48Factory.getHighScore();
	};

	$scope.newGame();

	$scope.newMove = function(dir) {
		//Takes a direction and updates board with moves in that direction
		//Updates score
		if (twenty48Factory.getStatus() === "Running") {
			$scope.gameBoard = twenty48Factory.makeMove(dir);
			$scope.currScore = twenty48Factory.getCurrScore();
			$scope.highScore = twenty48Factory.getHighScore();
			console.log(twenty48Factory.getStatus());
			if (twenty48Factory.getStatus() === "Win") {
				$scope.message = "Congrats! You won!";
			}
			else if (twenty48Factory.getStatus() === "Over") {
				$scope.message = "Game over!"
			}
		}

	};

	$scope.getStatus = function() {
		return twenty48Factory.getStatus();
	};

	$scope.getCellVal = function(row, col) {
		return $scope.gameBoard[row][col];
	};

}]);