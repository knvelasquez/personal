<?php
// Start the session
session_start();
ini_set('memory_limit', '1024M');

if(isset($_GET["file"])){
	$filename = $_GET['file'];  //this is the original file
}
if(isset($_POST["file"])){
	$filename = $_POST['file'];  //this is the original file
}

if(!file_exists($filename))
{
	die("file not found $filename");
}

$ext = pathinfo($filename, PATHINFO_EXTENSION);
$info   = getimagesize($filename);
$type = $info['mime'];
	
$degrees = -90;  //change this to be whatever degree of rotation you want

	$name = 'uploads/'.time().'.'.$ext;
	/*if(file_exists($name))
	{
		$name = 'uploads/'.time().'o.'.$ext;
	}*/
	
	if($type == 'image/jpeg')
	{
		$image = @imagecreatefromjpeg($filename);
		$source = @imagecreatefromjpeg($filename) or notfound();
		$rotate = @imagerotate($source,$degrees,0);
		//@unlink($filename);	
		@imagejpeg($rotate,$name); //save the new image
	}
	else
	{
		$image = @imagecreatefrompng($filename);
		$source = @imagecreatefrompng($filename) or notfound();
		$rotate = @imagerotate($source,$degrees,0);
		//@unlink($filename);	
		@imagepng($rotate,$name); //save the new image
		
	}

		$temp = substr($filename,0,19);
		
		
		$temp_ext = substr($filename,21);
		
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

	@unlink($filename);	
	@imagedestroy($source);

	echo $name;
?>