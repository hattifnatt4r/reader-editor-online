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
//echo 'filename '.$_SESSION["filename_opened"];
//echo '<div style="left: 83%; top: 20%; position:fixed;"> 
//<form action="" method="post"> <input type="text" id="save_text_text" name="text_origin" value="Mouse" style="width:0%;height:0%;">
//<input type="submit" id="save_text_submit" value="save" name="save_text" class="buttons" style="left: 83%; top: 20%; position:fixed;height:5%;width:2%;">
//</div>';

if (isset($_POST['save_text_js'])) {
	$text = $_POST["text_origin_js"];
	//echo $text;
	$fname = $_SESSION["filename_opened"];
	$myfile = fopen($fname, "w") or die("Unable to open file!");
	chmod($full_name, 0666);
	fwrite($myfile, $text);
	fclose($myfile);
	echo 'saved '.$fname;
	$_SESSION["file_text"] = $text;
	header('Location:/reader.html');
} 

//-- text -------------------------------------------------------------------
$dir = substr($_SESSION["usr_dir"], strpos($_SESSION["usr_dir"], "/")); if ($dir==$_SESSION["usr_dir"]){$dir='';}
$fname = substr($_SESSION["filename_opened"], strpos($_SESSION["filename_opened"], "/")+1);
$name = '<em id="file_title" style="font-style:normal;"><em style="color:#008000;opacity:0.6;">&#160&#160'.$dir.'/ </em>'.$fname.'</em>';
echo "<div id='text_from_file_box' class='text_scroll_box' >".  
//"<div class='text_scroll_shadow' style='top:0%;'> </div>".
//"<div class='text_scroll_shadow' style='top:95%;background: linear-gradient(rgba(255,255,255,0),white);'> </div>".
"<div class='text_scroll' align='left' >".$name."<div id='text_from_file' class='reader_text'></div>
</div></div>";
//echo "<div id='text_from_file' class='text_scroll' align='left' >".$_SESSION["file_text"]."</div>";
echo "<div hidden id='hidden_text' style='position:fixed; top:67%; left:85%'>".$_SESSION["file_text"]."</div>";

//-- buttons ----------------------------------------------------------------
//echo '<div id="reader_edit" class="buttons" onclick="reader_editor(reader_edit);"  style="left:85%;top:46%;width:14%;height:5%;">edit</div>' ;
//echo '<div id="reader_menu" class="buttons" onclick="show_reader_menu();"  style="left:85%;top:2%; width:14%;">menu</div>' ;
//echo '<div id="reader_go" class="buttons" onclick="show_menu_go();"  style="left:85%;top:25%; width:14%;height:5%;">go</div>' ;
//echo '<div id="reader_selecttype" class="buttons" onclick="reader_select_type(1);"  style="left: 85%;top:32%;width:14%;height:5%;">word</div>' ;
//echo '<div id="reader_zoomtype" class="buttons" onclick="reader_zoom_type(1);"  style="left:85%;top:39%;width:14%;height:5%;">zoom</div>' ;

//echo '<div id="prev" class="buttons" onclick="scrollbut_div(prev);"  style="left:85%;top:53%;width:14%;"><strong style="font-size:200%;">&#8672;</strong></div>' ;
//echo '<div id="next" class="buttons" onclick="scrollbut_div(next);"  style="left:85%;top:75%;width:14%;"><strong style="font-size:200%;">&#8674;</strong></div>' ;


?>

