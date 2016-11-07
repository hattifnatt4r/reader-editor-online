<?php
session_start();

$text = $_POST["text_origin"];
//echo $text;
$fname = $_SESSION["filename_opened"];
echo 'filename: '.$filename;
$myfile = fopen($fname, "w") or die("Unable to open file!");
chmod($full_name, 0666);
fwrite($myfile, $text);
fclose($myfile);
echo 'saved '.$fname;
//header('Location:/reader.html');
?>
