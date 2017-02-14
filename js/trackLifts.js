window.onload = init;

function init() {
	// localStorage.clear(); // use this to clear workouts from browser hx
	loadWorkouts();
	handleSaveWorkoutClick();
	// handleCreateChartClick();
}

//What happens when save workout button is clicked
function handleSaveWorkoutClick(){
	$("#saveWorkout").click(function(){

		function validateDate(dateStr){
			console.log(currentWorkout.date);
			var dateRE = /(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\d\d/; // date Regex
			return dateRE.test(dateStr);
		}
		// if weight string is empty, that's valid, else check against regex and return true or false
		function validateLifts(weight){
			if(weight === ""){
				return true;
			}
			else{
				var liftRE = /\d{1,3}(x|X)\d{1,2}(x|X)\d{1,2}/; // Regex for weightXrepsXsets (not perfect, but guarantees 2 x's)
				return liftRE.test(weight);
			}
		}
	
		var currentWorkout = {
			date: $("#date").val(),
			squat: $("#squat").val(),
			bench: $("#bench").val(),
			deadlift: $("#dl").val(),
			press: $("#press").val(),
			powerClean: $("#pc").val(),
		}
		// if date field is empty or of invalid form, prompt user to fill it out
		// later make this a MODAL instead of an alert??
		if(!validateDate(currentWorkout.date)){
			alert("Please Enter A Date In The Form Of MM/DD/YYYY");
		}

		// this is not DRY at all--find a better way to do this
		// check for if input field is empty (acceptable) or if it is invalid format (unacceptable--alert!)
		else if(!validateLifts(currentWorkout.squat)){
			alert("Please Enter Your Lifts In The Form of 225x5x3, e.g.")
		}
		else if(!validateLifts(currentWorkout.bench)){
			alert("Please Enter Your Lifts In The Form of 225x5x3, e.g.")
		}
		else if(!validateLifts(currentWorkout.deadlift)){
			alert("Please Enter Your Lifts In The Form of 225x5x3, e.g.")
		}
		else if(!validateLifts(currentWorkout.press)){
			alert("Please Enter Your Lifts In The Form of 225x5x3, e.g.")
		}
		else if(!validateLifts(currentWorkout.powerClean)){
			alert("Please Enter Your Lifts In The Form of 225x5x3, e.g.")
		}
		// else (all input is in correct format) save workout and update the page with new workout details
		else{
			save(currentWorkout);
		    getLiftDetails(currentWorkout);  
			
			// and clear input fields
			
			$("#date").val("");
			$("#squat").val("");
			$("#bench").val("");
			$("#dl").val("");
			$("#press").val("");
			$("#pc").val("");
				
	    }  		
	});

	function getLiftDetails(currentWorkout){
		var workoutDetails = [];
		for (var key in currentWorkout){
	    	if(currentWorkout.hasOwnProperty(key)){
	    		workoutDetails.push(currentWorkout[key]);
	    	}
		}
		printLiftDetails(workoutDetails);
	}

	function printLiftDetails(workoutDetails){
		var table = document.getElementById("workoutTable");
		var cellCount = 0;
		var row = table.insertRow(-1);
		workoutDetails.forEach(function(lift){
			var cell = row.insertCell(cellCount);
			cell.innerHTML = lift;
			cellCount++;
		});
	}
}

/*
function handleCreateChartClick(){
	$("#createButton").click(function(){
        alert("Creating Chart! (This feature coming someday soon...)");
    });
}
*/


//code to store and retrieve workouts 

function save(item) {
	var workoutArray = getStoreArray("workouts");
 	workoutArray.push(item);
	localStorage.setItem("workouts", JSON.stringify(workoutArray));
}

function loadWorkouts() {
	var workoutArray = getSavedWorkouts();
	if  (workoutArray != null) {
		var table = document.getElementById("workoutTable");
		
		for (var i = 0; i < workoutArray.length; i++) {

    		var cellCount = 0;
    		var row = table.insertRow(-1); // always insert after the last row, so -1
    		var singleWorkout = [];

    		for (var key in workoutArray[i]){
	    	if(workoutArray[i].hasOwnProperty(key)){
	    		singleWorkout.push(workoutArray[i][key]);
	    	}
    	}
    		

    		singleWorkout.forEach(function(lift){
    			var cell = row.insertCell(cellCount);
    			cell.innerHTML = lift;
    			cellCount++;
    		});
    		
			//$("#workoutList").append($("<li></li>").text(workoutArray[i]));
		}
	}
}

function getSavedWorkouts() {
	return getStoreArray("workouts");
}

function getStoreArray(key) {
	var workoutArray = localStorage.getItem(key);
	if  (workoutArray == null || workoutArray == "") {
	 workoutArray = new Array();
	}
	else {
	 workoutArray = JSON.parse(workoutArray);
	}
	return workoutArray;
}

