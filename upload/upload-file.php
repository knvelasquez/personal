<?php
$arr = array();
    ini_set('display_errors', 1);
    ini_set('memory_limit', '1024M');
    $foldername = "uploads/";

    if (!empty($_FILES)) {
        $fileupload = basename( $_FILES['file']['name']);
        $type = $_FILES['file']['type'];
        $fileSize = $_FILES['file']['size'];
		$targetPath = $foldername;

        $tempFile = $_FILES['file']['tmp_name'];

		$fileName = $_FILES['file']['name'];
		
		$name = pathinfo($fileName,PATHINFO_FILENAME);
		$name = preg_replace("/[^a-zA-Z0-9]+/", "", $name);
		$fname = $name;
		$extension = pathinfo($fileName, PATHINFO_EXTENSION);

		// rename the file if it collids with the existing one
		$i = 0;
		while(file_exists($targetPath.$name .'.'. $extension))
		{
			$i++;
			$name = $fname.$i;
		}

			$baseName = $name.'.'.$extension;

			$targetFile =  $targetPath. $baseName;
			
			if(move_uploaded_file($tempFile,$targetFile))
			{
				if($type == 'image/jpeg')
				{
					$exif = @exif_read_data($targetFile,'IFD0');
					if(isset($exif['Orientation']))
						$ort = $exif['Orientation'];
					else
						$ort = 0;
	//				var_dump($exif);
					switch($ort)
					{

						case 3: // 180 rotate left
								$degrees = 180;  //change this to be whatever degree of rotation you want
						 
								if($type == 'image/jpeg')
								{
                                    ini_set ('gd.jpeg_ignore_warning', 1);
									$image = @imagecreatefromjpeg($targetFile);
                                    ini_set ('gd.jpeg_ignore_warning', 1);
									$source = @imagecreatefromjpeg($targetFile) or notfound();
									$rotate = @imagerotate($source,$degrees,0);
									 
									@imagejpeg($rotate,$targetFile); //save the new image
								}

								break;


						case 6: // 90 rotate right
								$degrees = -90;  //change this to be whatever degree of rotation you want
						 
								if($type == 'image/jpeg')
								{
                                    ini_set ('gd.jpeg_ignore_warning', 1);
									$image = @imagecreatefromjpeg($targetFile);
                                    ini_set ('gd.jpeg_ignore_warning', 1);
									$source = @imagecreatefromjpeg($targetFile) or notfound();
									$rotate = @imagerotate($source,$degrees,0);
									 
									@imagejpeg($rotate,$targetFile); //save the new image
								}

								break;

						case 8:    // 90 rotate left
								$degrees = 90;  //change this to be whatever degree of rotation you want
						 
								if($type == 'image/jpeg')
								{
                                    ini_set ('gd.jpeg_ignore_warning', 1);
									$image = @imagecreatefromjpeg($targetFile);
                                    ini_set ('gd.jpeg_ignore_warning', 1);
									$source = @imagecreatefromjpeg($targetFile) or notfound();
									$rotate = imagerotate($source,$degrees,0);
									 
									@imagejpeg($rotate,$targetFile); //save the new image
								}

								break;
					}
				}
				echo $targetFile;
			}
    }
?>
