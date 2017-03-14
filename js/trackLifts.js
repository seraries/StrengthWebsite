angular.module('trackLiftsApp', []).controller('trackLiftsCtrl', 
['$scope', '$window', '$http', function($scope, $window, $http) {
	// If I want to clear local storage, use this: $window.localStorage.clear();
	$scope.reverseSort = true;
	// getLifts.php returns string of json style lift entries or empty string
	//$scope.wrkts = [];

	$http.get("../php/getLifts.php").then(function(response) {
			//$scope.wrkts = JSON.parse(response.data);
			$scope.wrkts = response.data;
		});

	// this function needs to come before its call in $scope.workouts below
	/*$scope.getSavedWorkouts = function (key) {
  // if none saved in local storage, create new array
	  var workoutArray = $window.localStorage.getItem(key);
	  if (workoutArray == null || workoutArray == ""){
	    workoutArray = new Array();
	  }
	  else {
	  	workoutArray = JSON.parse(workoutArray);
	  }
	  return workoutArray;
	}
	// holds array of workouts--get from local storage if some have been saved, or make new array.
	$scope.wrkts = $scope.getSavedWorkouts("workouts");
	*/

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
	  // alert user if they have only entered date field and no data about lifts
	  else if (!$scope.squat && !$scope.bench && !$scope.dl && !$scope.press && !$scope.pc) {
	    alert("Please Enter Results For At Least One Lift")
	  }
	  // got good data, so get details, save it, and reset the form
	  // workout object holds data for current workout being submitted
	  else {
	    var workout = {
	      date: new Date($scope.date),
	      squat: $scope.squat,
	      bench: $scope.bench,
	      deadlift: $scope.dl,
	      press: $scope.press,
	      powerClean: $scope.pc,
	    }
	    // this saves the new entry to wrkts
	    $scope.wrkts.push(workout);
	    // var myData = JSON.stringify($scope.wrkts);
	    $http.post("../php/setLifts.php", $scope.wrkts).then(function(response){
	    	$scope.wrkts = response.data;
	    });
	    /*
	    // this saves the newly appended wrkts array to local storage
	    $window.localStorage.setItem("workouts", JSON.stringify($scope.wrkts));
	    // Need to get the newly appended wrkts array from local storage (so it sorts correctly)
	    $scope.wrkts = $scope.getSavedWorkouts("workouts");
	    */
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
}]);

