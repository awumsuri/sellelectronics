<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Untitled Document</title>
</head>

<body>

<?php
$directory = 'Images/Song Titles';	//where the gallery images are located

$allowed_types=array('jpg','jpeg','gif','png');	//allowed image types

$file_parts=array();
$ext='';
$title='';
$i=0;

//try to open the directory
$dir_handle = @opendir($directory) or die("There is an error with your image directory!");

while ($file = readdir($dir_handle))	//traverse through the files
{
	if($file=='.' || $file == '..') continue;	//skip links to the current and parent directories

	$file_parts = explode('.',$file);	//split the file name and put each part in an array
	$ext = strtolower(array_pop($file_parts));	//the last element is the extension

	$title = implode('.',$file_parts);	//once the extension has been popped out, all that is left is the file name
	$title = htmlspecialchars($title);	//make the filename html-safe to prevent potential security issues

	$nomargin='';
	if(in_array($ext,$allowed_types))	//if the extension is an allowable type
	{
		if(($i+1)%4==0) $nomargin='nomargin';	//the last image on the row is assigned the CSS class "nomargin"
		echo '
		<div class="video '.$nomargin.'" style="background:url('.$directory.'/'.$file.') no-repeat 50% 50%;">
		<a href="'.$directory.'/'.$file.'" title="'.$title.'" target="_blank">'.$title.'</a>
		</div>';

		$i++;	//increment the image counter
	}
}

closedir($dir_handle);	//close the directory
?>

</body>
</html>