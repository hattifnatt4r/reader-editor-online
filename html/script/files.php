<?php
//echo '<script language=JavaScript type="text/javascript" src="script/files.js"></script>';

session_start();
if ($_SESSION["session"]!=10){
	$_SESSION['usr_dir'] = "users/common";
	$_SESSION['usr_home'] = "users/common";
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
//echo '<div style="position:fixed;top:0%;left:10%;z-order:1;width:70%;">'.$_SESSION['usr_dir'].'</div>';
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
    $i = 1; 
    foreach(scandir($_SESSION['usr_dir']) as $entry) {
		if ($entry!=".." && $entry!=".") { 
			$i = $i+1; 
			$filename = $_SESSION['usr_dir'].'/'.$entry;
			if (is_dir($filename)){array_push($arr_dir,$entry);} else{array_push($arr_file,$entry);}	
			} 
	}
	$_SESSION['nentry'] = $i-1;
    closedir($handle);
	$arr_entries = array_merge($arr_dir,$arr_file);
	$i=0;
	foreach($arr_entries as $entry){ $file_i=show_file($entry, $i); $show_arr=$show_arr.$file_i; $i=$i+1; }
    echo "<div hidden id='hidden_files_nentry' style='position:fixed; top:67%; left:85%'>".$_SESSION['nentry']."</div>";
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
	$filename = $_SESSION['usr_dir'].'/'.$entry;
	if (is_dir($filename)){$class='files files-dir';$title='dir';} else { $class='files files-txt';$title='txt'; }
	//$class='files files-dir';$title='dir';
	//$class='files';$title='txt';
	//if ($entry=='readme.txt'){ $class = 'files attention'; }
	$file_i = '<div id="fileid_'.$i.'"  class="'.$class.'" onclick="scroll_files('.$i.');"  style="'.$style.'" title="'.$title.'">'.$entry.'</div>' ;
	return($file_i);
}
echo "<div id='files_area_box' class='text_scroll_box' style='height:73%;'> <div class='text_scroll' align='left' >
<div id='files_area' class='reader_text'>".$show_arr."</div></div></div>";
echo "<div hidden style='position:fixed; top:0%; left:15%'>".$_SESSION["file_counter"]."</div>";
//---------------------------------------------------------------------------
function find_object($i_obj, $usr_dir){
	$entry = $_SESSION["files_arr"][$i_obj];
	//echo '<div style="position:fixed;top:97%;">'.$entry.'</div>';
	return $entry;}

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

if (isset($_POST["files_options_submit"])) {
	$value = $_POST["files_options_submit"];
	$_SESSION["file_counter"]=$_POST["files_options_n"];
	if ($value=='delete'){
		$entry=find_object($_SESSION["file_counter"],$_SESSION['usr_dir']);
		$filename = $_SESSION['usr_dir'].'/'.$entry;
		if (file_exists($filename)){ 
			rename($filename, $_SESSION['usr_home'].'/trash/'.$entry);}
		header('Location:/index.html');
	}elseif ($value=='edit'){
		//echo 'EDIT';
		$text = $_POST["files_options_text"];
		//echo 'TEXT: '.$text.' '; 
		if ($text!='' || $text!=' ' || $text!='  '){
			$entry=find_object($_SESSION["file_counter"],$_SESSION['usr_dir']);
			$filename = $_SESSION['usr_dir'].'/'.$entry;
			$filename_new = $_SESSION['usr_dir'].'/'.$text;
			if (!is_dir($filename)){$filename_new=$filename_new.'.txt';}
			if (file_exists($filename)){ 
				rename($filename, $filename_new);}
			header('Location:/index.html'); 
		}
		//header('Location:/index.html');
		}
}


//-- enter/options button ---------------------------------------------------

if (isset($_POST['enter_obj'])) {
	$value = $_POST['enter_obj'];
	$_SESSION["file_counter"]=$_POST["file_n"];
	//echo 'ENTER '.$_POST["file_n"];
	$entry=find_object($_SESSION["file_counter"],$_SESSION['usr_dir']);
	$filename = $_SESSION['usr_dir'].'/'.$entry;
	
		if ($_SESSION["file_counter"]==0){
			if ($_SESSION["usr_dir"]!=$_SESSION['usr_home']){
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
}

//-- login ------------------------------------------------------------------

if (isset($_POST['login_submit_name'])) {
	$name = $_POST['loginname_text_name'];
	$pass = $_POST['loginpass_text_name'];
	$value = $_POST['login_submit_name'];
	echo '<div style="position:fixed;top:0.5%;left:0%;z-order:1">'.'LOGIN '.$value.' name: '.$name.' pass: '.$pass.'</div>';
	if ($value=='newlogin'){
		//echo '<div style="position:fixed;top:0.5%;left:1%;z-order:1">'.'NEW LOGIN'.'</div>';
		$fname = "data/login.json";
		$myfile = fopen($fname, "r") or die("UUUUnable to open file!");
		$json = fread($myfile, filesize($fname));
		fclose($myfile);
		//echo '<div style="position:fixed;top:0.5%;left:10%;z-order:1">'.$json.'</div>';
		$text = substr($json,0,strrpos($json, "]")).  ', {"name":"'.$name.'","password":"'.$pass.'"}' .']}';
		//echo '<div style="position:fixed;top:2.5%;left:10%;z-order:0;width:70%;">'.$text.'</div>';
		$myfile = fopen($fname, "w") or die("UUUUnable to open file!");
		fwrite($myfile, $text);
		fclose($myfile);
		recurse_copy('users/common_backup',"users/".$name);
		chmod("users/".$name, 0777);
	}
	$_SESSION['usr_dir'] = "users/".$name;
	$_SESSION['usr_home'] = "users/".$name;
	header('Location:/index.html');
}
//-- copy -----------------------------------------------------------------

function recurse_copy($src,$dst) { 
    $dir = opendir($src); 
    @mkdir($dst); 
    while(false !== ( $file = readdir($dir)) ) { 
        if (( $file != '.' ) && ( $file != '..' )) { 
            if ( is_dir($src . '/' . $file) ) { recurse_copy($src . '/' . $file,$dst . '/' . $file);  } 
            else { copy($src . '/' . $file,$dst . '/' . $file); } 
		} 
    } 
    closedir($dir); 
} 
