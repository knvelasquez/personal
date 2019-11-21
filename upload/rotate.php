<?php
//Start the session
session_start();
ini_set('memory_limit', '1024M');
/*error_reporting(E_ALL);
ini_set('display_errors', 'on'); 
echo "aaa"; 
ob_flush();*/
header('Cache-Control: no-cache, no-store, max-age=0, must-revalidate');
header('Expires: January 01, 2013'); // Date in the past
header('Pragma: no-cache');
//change this to be whatever degree of rotation you want
$degree = (isset($_POST["degree"]))?$_POST["degree"]:(isset($_GET["degree"]))?$_GET["degree"]:-90;
//this is the original file
$filename=(isset($_POST["file"]))?$_POST["file"]:$_GET["file"];
$filename="uploads/$filename";
//if(!file_exists($filename))
//if(!@getimagesize($filename))
//{
//	die("file not found $filename");
//}
$ext = pathinfo($filename, PATHINFO_EXTENSION);
$info   = @getimagesize($filename);
$type = $info['mime'];
$name = '../uploads/'.time().'.'.$ext;
//Tipo de contenido
/*if(file_exists($name))
	{
		$name = 'uploads/'.time().'o.'.$ext;
	}*/	
if($type == 'image/jpeg')
{
	header('Content-type: image/jpeg');
	$image=imagecreatefromjpeg($filename);
	$rotate=@imagerotate($image,$degree,0);
	@unlink($filename);	
	imagejpeg($rotate,$filename); //save the new image
	imagejpeg($rotate); //save the new image
}
else
{
	header("Content-Type: image/png");
	$image = imagecreatefrompng($filename);			
	$rotate = imagerotate($image,$degree,0);
	@unlink($filename);			
	imagepng($rotate); //save the new image	
	imagepng($rotate,$filename); //save the new image
}
//free the memory
imagedestroy($image);
imagedestroy($rotate);
?>