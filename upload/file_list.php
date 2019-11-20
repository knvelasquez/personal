<?php
$path="uploads";
$result=[];
foreach((array_diff(scandir($path,0), array('.', '..'))) as $index=>$filename){
	if(strrpos($filename, ".png")>0 || strrpos($filename, ".jpg")>0){
		array_push($result, $path."/".$filename);
	}
}
echo json_encode($result);
?>