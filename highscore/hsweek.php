<?php

$MAXENTRIES = 10;
$DBPATH = "highscore/dbweek.json";

//Example of post
$POST = '{  
            "name": "x",
            "score": "999"
        }';

$POST = $_POST["data"];  //comment this line when testing this script

class HighScore{

	var $CurrentHS;
	var $incomingHS;

	function obtainHS()
	{
	$string = file_get_contents("dbweek.json");
	$this->CurrentHS = json_decode($string, true);
	}

	function ParseData($jsonstring)
	{
		
		$tmp = json_decode($jsonstring,true);

		if(count($tmp)!=2){ //check for post array size
			return "Size of array != 2";
		}

		//check for a valid int in score
		function intCheck($var) {
		    return ((string)(int)$var === $var);
		}
		if( intCheck($tmp['score']) == 0){ 
			return "Bad Score :".$tmp['score'];
		}

		//strip provided name from non alphanumeric characters
		function Stripper($s){
			$st = preg_replace("/[^A-Za-z0-9 ]/", '', $s);
			$st = substr($st,$start = 0, $length=12);
			return $st;
		}
		$tmp['name'] = Stripper($tmp['name']);
		//check if name is empty
		if ($tmp['name']=="") {
			return "Empty name";
		}

		//everything is ok
		$this->incomingHS = $tmp;
		return "ok";
	}

	function ManageNewScore()
	{
		//push
		array_push($this->CurrentHS["entries"], $this->incomingHS);

		//sort
		function cmp($a, $b)
		{
		    return $a["score"] < $b["score"];
		}

		usort($this->CurrentHS["entries"], "cmp");

		//delete last score in array 
		array_pop($this->CurrentHS["entries"]);
	}

	function SaveToFile()
	{
		$data = json_encode($this->CurrentHS);
		file_put_contents("dbweek.json", $data);		
	}
}

//init class
$hs = new HighScore;
//validate submitted data
$parseResult = $hs->ParseData($POST);

if ($parseResult == "ok") {
	
}
else{
	echo $parseResult."\n";
	print_r($POST);	
	die("Bad post data");
}



//read highscores
$hs->obtainHS();
//check if sent score is bigger than the smallest
$hs->ManageNewScore();
//update json
$hs->SaveToFile();

//print_r($hs->CurrentHS);

echo "ok";
?>