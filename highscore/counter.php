<?php
$DB = "counter.db";

$file = file_get_contents($DB);

$score = intval($file);
$score += 1;

file_put_contents($DB, $score);
echo $score;

?>