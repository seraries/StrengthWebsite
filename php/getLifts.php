<?php
$filename = "lifts.txt";

if (file_exists($filename)) {
	$jsonData = file_get_contents($filename);
}
// might need to make this a string that resemble json data but with empty strings for all the fields.
else {
	// create a file
	$jsonData = '[{"date":"","squat":"","bench":"","deadlift":"","press":"","powerClean":""}]';
	file_put_contents($filename, $jsonData);
}

echo $jsonData;
