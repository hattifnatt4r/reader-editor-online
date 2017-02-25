<?php
session_start();
if ($_SESSION["session_reader"]!=10){
	$_SESSION["session_reader"] = 10;
	$_SESSION["reader_counter"] = 0;
	}
//-- go ---------------------------------------------------------------------
if (isset($_POST['reader_menu_go_files'])) {
	header('Location:/index.html');
	}	
if (isset($_POST['reader_menu_go_file1'])) {
	header('Location:/index.html');
	}
//echo "<div style='position:fixed; top:0%; left:2%'>".$_SESSION["filename_opened"]."</div>";

if (isset($_POST['save_text_js'])) {
	$text = $_POST["text_origin_js"];
	//echo $text;
	$fname = $_SESSION["filename_opened"];
	$myfile = fopen($fname, "w") or die("Unable to open file!");
	chmod($fname, 0666);
	fwrite($myfile, $text);
	fclose($myfile);
	echo 'saved '.$fname;
	$_SESSION["file_text"] = $text;
	header('Location:/reader.html');
} 

//-- text -------------------------------------------------------------------
$dir = substr($_SESSION["usr_dir"], strpos($_SESSION["usr_dir"], "/")); 
if ($dir==$_SESSION["usr_dir"]){$dir='';} 
$fname = substr($_SESSION["filename_opened"], strrpos($_SESSION["filename_opened"], "/")+1);
$name = '<em id="file_title" style="font-style:normal;"><em style="color:#008000;opacity:0.6;">&#160&#160'.$dir.'/ </em>'.$fname.'</em>';
echo "<div id='text_from_file_box' class='text_scroll_box' >".  
"<div class='text_scroll' align='left' >".$name."<div id='text_from_file' class='reader_text'></div>
</div></div>";
echo "<div hidden id='hidden_text' style='position:fixed; top:67%; left:85%'>".$_SESSION["file_text"]."</div>";
//echo "<div style='position:fixed; top:0%; left:2%'>".$_SESSION["file_text"]."</div>";

?>

