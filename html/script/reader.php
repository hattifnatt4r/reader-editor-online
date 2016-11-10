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
echo 'filename '.$_SESSION["filename_opened"];
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

echo '<input id="reader_edit" type="button" class="buttons" value="edit 2" onclick="reader_editor(reader_edit);"  style="left:85%; top:46%; position:fixed; width:14%;height:5%;">' ;

//-- text -------------------------------------------------------------------
//$test = "<em id='w53'> the</em><em id='w54'> arsenic</em>";
//$new_text = parse_text($_SESSION["file_text"]);
//echo "<div id='text_from_file' class='text_scroll' > $new_text </div>";
echo "<div id='text_from_file' class='text_scroll' align='left' >".$_SESSION["file_text"]."</div>";
echo "<div hidden id='hidden_text' style='position:fixed; top:67%; left:85%'>".$_SESSION["file_text"]."</div>";

//-- buttons ----------------------------------------------------------------

echo '<input id="reader_menu" type="button" class="buttons" value="menu" onclick="show_reader_menu();"  style="left: 85%; top: 2%; position:fixed; width:14%;">' ;
echo '<input id="reader_go" type="button" class="buttons" value="go" onclick="show_menu_go();"  style="left: 85%; top: 25%; position:fixed; width:14%;height:5%;">' ;
echo '<input id="reader_selecttype" type="button" class="buttons" value="word" onclick="reader_select_type(1);"  style="left: 85%; top: 32%; position:fixed; width:14%;height:5%;">' ;
echo '<input id="reader_zoomtype" type="button" class="buttons" value="zoom" onclick="reader_zoom_type(1);"  style="left: 85%; top: 39%; position:fixed; width:14%;height:5%;">' ;

echo '<input id="prev" type="button" class="buttons" value="prev" onclick="scrollbut_div(prev);"  style="left: 85%; top: 53%; position:fixed; width:14%;">' ;
echo '<input id="next" type="button" class="buttons" value="next" onclick="scrollbut_div(next);"  style="left: 85%; top: 75%; position:fixed; width:14%;">' ;


?>

