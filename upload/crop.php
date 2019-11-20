<?php
// Start the session
session_start();
ini_set('memory_limit', '1024M');

define('UPLOAD_DIR', 'uploads/');
$img = $_POST['imgBase64'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = UPLOAD_DIR . uniqid() . '.png';
$success = file_put_contents($file, $data);
 @unlink($_POST['origenal']);


		$temp = substr($_POST['origenal'],0,19);
		$temp_ext = substr($_POST['origenal'],21);
		
		if(file_exists($temp.'l'.$temp_ext))
		{
			@unlink($temp.'l'.$temp_ext);
		}
		if(file_exists($temp.'m'.$temp_ext))
		{
			@unlink($temp.'m'.$temp_ext);
		}
		
		if(file_exists($temp.'t'.$temp_ext))
		{
			@unlink($temp.'t'.$temp_ext);
		}


print $success ? $file : 'Unable to save the file.';
?>