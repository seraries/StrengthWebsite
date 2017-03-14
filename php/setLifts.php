<?php
$postdata = file_get_contents("php://input");
//$request = json_decode($postdata);
$filename = "lifts.txt";

// $file = fopen($filename, 'w');
// fwrite($file, $request);
// fclose($file);
//file_put_contents($filename, $request);
file_put_contents($filename, $postdata);
$updatedData = file_get_contents($filename);
echo $updatedData;