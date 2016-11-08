app.controller("twenty48Controller", ['$scope', 'twenty48Factory', function($scope, twenty48Factory) {

	$scope.gameBoard = [];
	$scope.currScore;
	$scope.highScore = 0;

	$scope.newGame = function() {
		$scope.currScore = 0;
		$scope.gameBoard = twenty48Factory.init();
	};

	$scope.newGame();

	$scope.newMove = function(dir) {
		//Takes a direction and updates board with moves in that direction
		//Updates score
		console.log(twenty48Factory.getStatus());
		if (twenty48Factory.getStatus() === "Running") {
			$scope.gameBoard = twenty48Factory.makeMove(dir);
			console.log("GAMEBOARD: " + $scope.gameBoard);
			$scope.currScore = twenty48Factory.getCurrScore();
			$scope.highScore = twenty48Factory.getHighScore();
			if ($scope.currScore >= $scope.highScore) {
				$scope.highScore = $scope.currScore;
			}
		}

		else {  //2048 Reached
			alert("You win!");
		}

	};

	$scope.getCellVal = function(row, col) {
		return $scope.gameBoard[row][col];
	}

}]);