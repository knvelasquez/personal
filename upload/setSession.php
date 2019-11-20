<?php
// Start the session
session_start();

$_SESSION['files_array'][$_POST['no']-1] = array('no'=>$_POST['no'],'path'=>$_POST['image']);

$temp = $_SESSION['last_order'];

$i = 0;
foreach($temp as $t)
{
	$v = substr($t,5);
	$_SESSION['correct_order'][$i] = $_SESSION['files_array'][$v-1];
	$i++;
}

var_dump($_SESSION['correct_order']);
echo '==============';
var_dump($_SESSION['correct_order']);

?>