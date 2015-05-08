<?php

function Stripper($s){
			$st = preg_replace("/[^A-Za-z0-9 ]/", '', $s);
			$st = substr($st,$start = 0, $length=10);
			return $st;
		}


$s = "asdaaaaaaaaaaaa";
echo $s." -> ".Stripper($s)


?>