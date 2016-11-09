app.directive('keypressDir', function($document) {
	return function (scope) {
            $document.bind('keydown', function (e) {
                var keyCode = e.which || e.keyCode;
                    switch (keyCode) {
                        case 37:
                        case 38:
                        case 39:
                        case 40: 
                            scope.$apply(function() {
                                scope.newMove(keyCode);
                            });
                            break;
                    }
            });
        }
});
