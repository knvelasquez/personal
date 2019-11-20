<?php
function resize($filename,$s,$i,$ss)
{
	$ext = pathinfo($filename, PATHINFO_EXTENSION);
	$info   = getimagesize($filename);
	$width = $info[0];
	$height = $info[1];
	$type = $info['mime'];
	if($s == 't')
	{
		if($width > $height)
		{
			$new_width = 60;
			$new_height = $height*$new_width/$width;
		}
		else
		{
			$new_height = 60;
			$new_width = $width*$new_height/$height;
		}
	}
	else if($s == 'm')
	{
		if(($width/170) > ($height/250))
		{
			$new_width = 170;
			$new_height = $height*$new_width/$width;
		}
		else
		{
			$new_height = 250;
			$new_width = $width*$new_height/$height;
		}
	}
	else if($s == 'l')
	{
		if(($width/550) > ($height/600))
		{
			$new_width = 550;
			$new_height = $height*$new_width/$width;
		}
		else
		{
			$new_height = 600;
			$new_width = $width*$new_height/$height;
		}
	}
	else if($s == 'xl')
	{
		if($width > $height)
		{
			$new_width = 1024;
			$new_height = $height*$new_width/$width;
		}
		else
		{
			$new_height = 1024;
			$new_width = $width*$new_height/$height;
		}
	}
	else
	{
	}
	// Resample
	$image_p = imagecreatetruecolor($new_width, $new_height);
	if($type == 'image/jpeg')
	{
		$image = imagecreatefromjpeg($filename);
		imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
		$name = 'uploads/'.$ss.$i.$s.'.'.$ext;
		// Output
		imagejpeg($image_p,$name, 100);
	}
	else if($type == 'image/png')
	{
		$image = imagecreatefrompng($filename);
		imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
		$name = 'uploads/'.$ss.$i.$s.'.'.$ext;
		// Output
		imagepng($image_p,$name, 3);
	}
	return $name;
}

$t = "";
$i = 1;

$files = json_decode($_POST['files']);
foreach($files as $c)
{
	if(!empty($c))
	{
		$s = time();
		$t.= "small=".resize($c,'t',$i,$s).",";
		$t.= "medium=".resize($c,'m',$i,$s).",";
		$t.= "large=".resize($c,'l',$i,$s).",";
		$t.= "xlarge=".resize($c,'xl',$i,$s)."|";
		@unlink($c);
		$temp = substr($c,0,19);
		$temp_ext = substr($c,21);
		
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
	}
	$i++;
}
/*
$sql = "INSERT INTO image_details (name,images) VALUES ('".$_POST['title']."','".substr($t, 0, -1)."')";

var_dump($sql);
*/
echo substr($t, 0, -1);
?>