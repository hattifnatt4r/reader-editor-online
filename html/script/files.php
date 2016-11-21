<?php
echo '<script language=JavaScript type="text/javascript" src="script/files.js"></script>';
session_start();
if ($_SESSION["session"]!=10){
	$_SESSION['usr_dir'] = "books_test";
	$_SESSION["file_counter"] = 0;
	$_SESSION["word_i"] = 'HHEELLOO';
	$_SESSION['nentry'] = 0;
	$_SESSION["letter_i"] = 'a';
	//echo 'SESSION_START';
	$_SESSION["session"] = 10;
	$_SESSION["file_text"] = '';
	$_SESSION["editor_exit"] = '';
	
	$_SESSION["filename_opened"] = '';
	$_SESSION["files_arr"] = array();
	}
//echo 'USR-DIR'.$_SESSION['usr_dir'].' ';
$entry=find_object($_SESSION["file_counter"], $_SESSION['usr_dir']);
$filename = $_SESSION["usr_dir"].'/'.$entry;
//echo '<div style="left: 25%; top: 78%;  position:fixed;">'.$_SESSION["file_counter"].' '.$filename.'</div>';
echo "<div hidden id='hidden_files_dir' style='position:fixed; top:60%; left:85%'>".$_SESSION['usr_dir']."</div>";
//echo '<div style="left: 25%; top: 85%;  position:fixed;">'.$_SESSION["word_i"].' '.'</div>';
//echo '<div style="left: 25%; top: 90%;  position:fixed;">'.session_status().' '.'</div>';

//-- files ------------------------------------------------------------------
echo '<div id="files_zoom_area" class="reader_zoom_box">  
 <div id="files_zoom" class="text_zoom">..</div> </div>';
$arr_dir=array(); $arr_file=array(); $arr_entries=array(); array_push($arr_dir, '..');
if ($handle = opendir($_SESSION['usr_dir'])) {
    $i = 1; //$show_arr = show_file('..',0);
    foreach(scandir($_SESSION['usr_dir']) as $entry) {
		if ($entry!=".." && $entry!=".") { 
			//$file_i=show_file($entry, $i); $show_arr = $show_arr.$file_i; 
			$i = $i+1; 
			$filename = $_SESSION['usr_dir'].'/'.$entry;
			if (is_dir($filename)){array_push($arr_dir,$entry);} else{array_push($arr_file,$entry);}	
			} 
	}
	$_SESSION['nentry'] = $i-1;
    closedir($handle);
	$arr_entries = array_merge($arr_dir,$arr_file);
	$i=0;
	//echo '<div style="position:fixed;top:97%;">'.htmlspecialchars($arr_dir).'</div>';
	foreach($arr_entries as $entry){ $file_i=show_file($entry, $i); $show_arr=$show_arr.$file_i; $i=$i+1; }
    echo "<div id='hidden_files_nentry' style='position:fixed; top:67%; left:85%'>".$_SESSION['nentry']."</div>";
} else {echo "bad dir";}
$_SESSION["files_arr"]=$arr_entries;

function show_file($entry, $i){
	$left = 3; $right = 97; $xn=4; $xspace=5; $top=5;  $yspace=$xspace*1.8;
	$xwidth = ( $right-$left-($xn-1)*$xspace )/$xn;    $ywidth=$xwidth*1.5;
	$x = $left + ($xspace+$xwidth)* ($i%$xn);
	$y = $top +  ($yspace+$ywidth)*($i-$i%$xn)/$xn;
	$style = "position:absolute;
		left: $x%; top: $y%;
		width:$xwidth%; height:$ywidth%;
		" ;		
	//echo '<div id="fileid_'.$i.'"  class="buttons" onclick="scroll_files('.$i.');"  style="'.$style.'">'.$entry.'</div>' ;
	$filename = $_SESSION['usr_dir'].'/'.$entry;
	if (is_dir($filename)){$class='files files-dir';$title='dir';} else { $class='files files-txt';$title='txt'; }
	//$class='files files-txt';
	$file_i = '<div id="fileid_'.$i.'"  class="'.$class.'" onclick="scroll_files('.$i.');"  style="'.$style.'" title="'.$title.'">'.$entry.'</div>' ;
	return($file_i);
}
echo "<div id='files_area_box' class='text_scroll_box' style='height:73%;'> <div class='text_scroll' align='left' >
<div id='files_area' class='reader_text'>".$show_arr."</div></div></div>";
//---------------------------------------------------------------------------
function find_object($i_obj, $usr_dir){
	//$entry = $arr_entries[$i_obj];
	$entry = $_SESSION["files_arr"][$i_obj];
	//$entry = $arr_entries[2];
	echo '<div style="position:fixed;top:97%;">'.$entry.'</div>';
	/*
	$entry = 'none';
	if ($handle = opendir($usr_dir)) {
	    $i = 1;
	    while (false !== ($entry_i = readdir($handle))) {
	        if ($entry_i!=".."){
				if ($entry_i!="."){
					if ($i==$i_obj){$entry=$entry_i;}
					$i = $i+1;
					} 
				}
	    }
	    closedir($handle);
	} */
	//echo $entry;
	return $entry;}

/*
echo '<div id="files_button_restart" style="left: 84%;	top: 2%; position:fixed;"> 
<form action="" method="post"> <input type="submit" value="restart" name="new_session" class="buttons" style="height:5%;">
	</div>';
if (isset($_POST['new_session'])) {
	$_SESSION['usr_dir'] = "books_test";
	$_SESSION["file_counter"] = 0;
	$_SESSION["word_i"] = 'HHEELLOO';
	header('Location:/index.html');
} */


//-- new file/folder --------------------------------------------------------
function create_file($fname, $usr_dir) {
	$full_name = $usr_dir."/".$fname.".txt";
	$myfile = fopen($full_name, "w") or die("Unable to open file!");
	chmod($full_name, 0666);
	fclose($myfile);
	echo 'FILE: '.$full_name.' ';
}function create_dir($fname, $usr_dir) {
	$full_name = $usr_dir."/".$fname;
	echo 'DIR: '.$full_name.' ';
	mkdir($full_name, 0777);
}
if (isset($_POST['files_create_submit'])) {
	$value = $_POST['files_create_submit'];
	$text = $_POST["files_name_text"];
	echo 'TEXT: '.$text.' '; 
	if ($text!='' || $text!=' ' || $text!='  '){
		if ($value=='create file') { create_file($text,$_SESSION['usr_dir']); }
		elseif ($value=='create dir') { create_dir($text,$_SESSION['usr_dir']); }
		header('Location:/index.html'); 
	}
}

//-- file options -----------------------------------------------------------
/*
if (isset($_POST['foptions'])) {
	//echo 'foptions';
	echo '<div id="files_foptions" class="folder" style="left: 33%; top: 20%; position:fixed; width:60%; height:70%"> 
		<form action="" method="post"> <input type="submit" value="delete object" name="delete_obj" class="buttons" style="left: 33%; top: 20%;" >
		<form action="" method="post"> <input type="submit" value="rename object" name="rename" class="buttons" style="left: 65%; top: 20%;" >
		</div>';  
}*/

if (isset($_POST['delete_obj'])) {
	$entry=find_object($_SESSION["file_counter"],$_SESSION['usr_dir']);
	$filename = $_SESSION['usr_dir'].'/'.$entry;
	if (file_exists($filename)){ 
		rename($filename, 'books_test/trash/'.$entry);}
	header('Location:/index.html');
}

if (isset($_POST["files_options_submit"])) {
	$value = $_POST["files_options_submit"];
	$_SESSION["file_counter"]=$_POST["files_options_n"];
	if ($value=='delete'){
		$entry=find_object($_SESSION["file_counter"],$_SESSION['usr_dir']);
		$filename = $_SESSION['usr_dir'].'/'.$entry;
		if (file_exists($filename)){ 
			rename($filename, 'books_test/trash/'.$entry);}
		header('Location:/index.html');
	}elseif ($value=='edit'){
		echo 'EDIT';
		$text = $_POST["files_options_text"];
		echo 'TEXT: '.$text.' '; 
		if ($text!='' || $text!=' ' || $text!='  '){
			$entry=find_object($_SESSION["file_counter"],$_SESSION['usr_dir']);
			$filename = $_SESSION['usr_dir'].'/'.$entry;
			$filename_new = $_SESSION['usr_dir'].'/'.$text;
			if (file_exists($filename)){ 
				rename($filename, $filename_new);}
			header('Location:/index.html'); 
		}
		//header('Location:/index.html');
		}
}


//-- enter/options button ---------------------------------------------------
/*
echo '<div id="files_button_enter" style="left: 84%;	top: 53%;  position:fixed;"> 
<form action="" method="post">  <input type="text" id="file_n" name="file_n" value="Mouse" style="width:0%;height:0%;">
<input type="submit" value="enter" name="enter_obj" class="buttons" style="left:84%;top:53%;">
<input type="submit" value="options" name="enter_obj" class="buttons" style="left:84%;top:30%;">
	</div>';
	*/ 
if (isset($_POST['enter_obj'])) {
	$value = $_POST['enter_obj'];
	$_SESSION["file_counter"]=$_POST["file_n"];
	//echo 'ENTER '.$_POST["file_n"];
	$entry=find_object($_SESSION["file_counter"],$_SESSION['usr_dir']);
	$filename = $_SESSION['usr_dir'].'/'.$entry;
	
		if ($_SESSION["file_counter"]==0){
			if ($_SESSION["usr_dir"]!='books_test'){
				$new_dir = substr($_SESSION["usr_dir"],0,strrpos($_SESSION["usr_dir"], "/"));
				$_SESSION["usr_dir"] = $new_dir;
				//$_SESSION['file_counter'] = 0;
				header('Location:/index.html');
				}
		}else{
			if (is_dir($filename)){ 
				$_SESSION['usr_dir'] = $filename;
				//$_SESSION['file_counter'] = 0;
				//echo 'NEW-DIR'.$_SESSION['usr_dir'];
				header('Location:/index.html');
			}else{
				$myfile = fopen($filename, "r") or die("Unable to open file!");
				$txt = fread($myfile, filesize($filename));
				//fwrite($myfile, $txt);
				fclose($myfile);
				$_SESSION["file_text"] = $txt;
				//echo filesize($filename).$filename.'TEXT:'.$txt;
				//isset($_POST['enter_obj'])=False;
				$_SESSION["filename_opened"] = $filename;
				header('Location:/reader.html');
				//header('Location:/index.html');
				}
			}
	
	/*
	elseif($value=='options'){ 
		echo '<div id="files_options_area">
		      <div id="files_options_back"  onclick="editor_back(this.id);" class="back_area"></div>
		      <div id="files_options_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,0.9);">
		      <form action="" method="post"> <input type="submit" value="delete object" name="delete_obj" class="buttons" style="left: 33%; top: 20%;" >
		      <form action="" method="post"> <input type="submit" value="rename object" name="rename" class="buttons" style="left: 65%; top: 20%;" >
		      </div></div>';
	}
	*/
	//header('Location:/index.html');
}


?>
