window.onload = function(){
	// Do I need to put something here?
	calculateLifts();
}

function calculateLifts(){
var sex = "none";

$("input[id='maleButton']").change(function(){
	sex = "male";
});
$("input[id='femaleButton']").change(function(){
	sex = "female";
});

var weight = "0";

$(".weightRange").change(function(){
	weight = $(this).val();
	if(sex == "female"){
		printWomenLifts();
	}
	else if(sex == "male"){
		printMenLifts();
	}
	else if(sex == "none"){
		alert("Please select male or female, then re-select your weight")
		$(".weightRange").val('')
	}
	

});

function printWomenLifts(){
	switch(weight){
		case "97":
		$("#squat").val("98");
		$("#bench").val("73");
		$("#deadlift").val("122");
		break;
		case "105":
		$("#squat").val("106");
		$("#bench").val("79");
		$("#deadlift").val("132");
		break;
		case "114":
		$("#squat").val("114");
		$("#bench").val("85");
		$("#deadlift").val("142");
		break;
		case "123":
		$("#squat").val("121");
		$("#bench").val("90");
		$("#deadlift").val("151");
		break;
		case "132":
		$("#squat").val("127");
		$("#bench").val("95");
		$("#deadlift").val("159");
		break;
		case "148":
		$("#squat").val("141");
		$("#bench").val("105");
		$("#deadlift").val("176");
		break;
		case "165":
		$("#squat").val("151");
		$("#bench").val("113");
		$("#deadlift").val("189");
		break;
		case "181":
		$("#squat").val("164");
		$("#bench").val("122");
		$("#deadlift").val("204");
		break;
		case "198":
		$("#squat").val("174");
		$("#bench").val("130");
		$("#deadlift").val("217");
		break;
		case "220":
		case "242":
		case "275":
		$("#squat").val("194");
		$("#bench").val("143");
		$("#deadlift").val("232");
	}
}

function printMenLifts(){
	switch(weight){
		case "97":
		case "105":
		case "114":
		$("#squat").val("174");
		$("#bench").val("130");
		$("#deadlift").val("204");
		break;
		case "123":
		$("#squat").val("190");
		$("#bench").val("142");
		$("#deadlift").val("222");
		break;
		case "132":
		$("#squat").val("205");
		$("#bench").val("153");
		$("#deadlift").val("239");
		break;
		case "148":
		$("#squat").val("230");
		$("#bench").val("172");
		$("#deadlift").val("269");
		break;
		case "165":
		$("#squat").val("250");
		$("#bench").val("187");
		$("#deadlift").val("293");
		break;
		case "181":
		$("#squat").val("269");
		$("#bench").val("201");
		$("#deadlift").val("315");
		break;
		case "198":
		$("#squat").val("285");
		$("#bench").val("213");
		$("#deadlift").val("333");
		break;
		case "220":
		$("#squat").val("301");
		$("#bench").val("225");
		$("#deadlift").val("351");
		break;
		case "242":
		$("#squat").val("311");
		$("#bench").val("232");
		$("#deadlift").val("363");
		break;
		case "275":
		$("#squat").val("319");
		$("#bench").val("239");
		$("#deadlift").val("373");

	}
}

} // end of function "calculateLifts()"