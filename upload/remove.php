<?php
	@unlink($_POST['path']);
	
		$temp = substr($_POST['path'],0,19);
		$temp_ext = substr($_POST['path'],21);
		
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
?>