<?php
// Start the session
//session_start();

ini_set('memory_limit', '1024M');
//change this to be whatever degree of rotation you want
$degree = (isset($_POST["degree"]))?$_POST["degree"]:(isset($_GET["degree"]))?$_GET["degree"]:90;
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

// Tipo de contenido

/*if(file_exists($name))
	{
		$name = 'uploads/'.time().'o.'.$ext;
	}*/
	
if($type == 'image/jpeg')
{
	header('Content-type: image/jpeg');
	$image=imagecreatefromjpeg($filename);
	//$source=@imagecreatefromjpeg($filename) or notfound();
	$rotate=@imagerotate($image,$degree,0);
	@unlink($filename);	
	imagejpeg($rotate,$filename); //save the new image
	imagejpeg($rotate); //save the new image
}
else
{
	header('Content-type: image/png');	
	$image = imagepng($filename);
	die("imagepng");
	//$source = imagecreatefrompng($filename) or notfound();
	$rotate = imagerotate($image,$degree,0);
	@unlink($filename);	
		
	imagepng($rotate); //save the new image	
	imagepng($rotate,$filename); //save the new image

//base64_encode($filename);	
}
//free the memory
imagedestroy($source);
imagedestroy($rotate);	
//$temp = substr($filename,0,19);		
//$temp_ext = substr($filename,21);		
/*if(file_exists($temp.'l'.$temp_ext))
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
}*/
//echo $name;
?>
