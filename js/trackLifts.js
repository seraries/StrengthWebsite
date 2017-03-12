angular.module('trackLiftsApp', []).controller('trackLiftsCtrl', 
function($scope) {
	// holds array of workouts--get from local storage if some have been saved, or make new array.
	$scope.wrkts = [];

	$scope.isGoodDate = function () {
	  // if input field is empty, it's no good; but if it matches regex it's okay
	  if (!$scope.date){
	    return false;
	  }
	  else {
	    var dateRE = /(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\d\d$/; // date Regex
	    return dateRE.test($scope.date);
	  }
	}

	$scope.isFormatted = function (lift) {
	  // if input field is empty, it's okay; or if it matches regex it's okay
	  if (!lift){
	    return true;
	  }
	  else {
	    var liftRE = /\d{1,3}(x|X)\d{1,2}(x|X)\d{1,2}$/;
	    return liftRE.test(lift);
	  }
	}
	
	$scope.saveWorkout = function () {
	  // validate data and alert if date or lifts are formatted wrong
	  if (!$scope.isGoodDate()) {
	    alert("Please Enter A Date In The Form Of MM/DD/YYYY");
	  } 
	  else if (!$scope.isFormatted($scope.squat) || !$scope.isFormatted($scope.bench) ||
	    !$scope.isFormatted($scope.dl) || !$scope.isFormatted($scope.press) || !$scope.isFormatted($scope.pc)) {
	    alert("Please Enter Your Lifts In The Form of 135x5x3, for example")
	  }
	  // got good data, so save it and reset form
	  // workout object holds data for current workout being submitted
	  else {
	    var workout = {
	      date: $scope.date,
	      squat: $scope.squat,
	      bench: $scope.bench,
	      deadlift: $scope.dl,
	      press: $scope.press,
	      powerClean: $scope.pc,
	    }
	    $scope.wrkts.push(workout);
	    // reset form values and make "untouched"
	    $scope.date = "";
	    $scope.squat = "";
	    $scope.bench = "";
	    $scope.dl = "";
	    $scope.press = "";
	    $scope.pc = "";
	    $scope.myForm.$setUntouched(); 
	  }
	}
});

