<?php
session_start();
if ($_SESSION["session"]!=10){
	$_SESSION['usr_dir'] = "books_test";
	$_SESSION["file_counter"] = 0;
	$_SESSION["word_i"] = 'HHEELLOO';
	$_SESSION['nentry'] = 0;
	$_SESSION["letter_i"] = 'a';
	echo 'SESSION_START';
	$_SESSION["session"] = 10;
	$_SESSION["file_text"] = '';
	}
//echo 'USR-DIR'.$_SESSION['usr_dir'].' ';
$entry=find_object($_SESSION["file_counter"], $_SESSION['usr_dir']);
$filename = $_SESSION["usr_dir"].'/'.$entry;
echo '<div style="left: 25%; top: 78%;  position:fixed;">'.$_SESSION["file_counter"].' '.$filename.'</div>';
echo '<div style="left: 25%; top: 85%;  position:fixed;">'.$_SESSION["word_i"].' '.'</div>';
echo '<div style="left: 25%; top: 90%;  position:fixed;">'.session_status().' '.'</div>';

//-- files ------------------------------------------------------------------
echo '<div class="folder_bkg" >  files </div>';
echo '<div class="folder", style="left: 5%; top: 5%;" >  .. </div>';
if ($handle = opendir($_SESSION['usr_dir'])) {
    $i = 1;
    while (false !== ($entry = readdir($handle))) {
        if ($entry!=".."){
			if ($entry!="."){show_file($entry, $i);$i = $i+1;} }
    }
    $_SESSION['nentry'] = $i-1;
    closedir($handle);
} else {echo "bad dir";}

function show_file($entry, $i){
	$a = 5+($i%4)*20;	
	$b = 5+($i-$i%4)/4*24;
	$style = "align: center;
		left: $a%;
		top: $b%;
		" ;		
	echo "<div class='folder' style='$style' > 
	$entry
	</div>";
}
//---------------------------------------------------------------------------
function find_object($i_obj, $usr_dir){
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
	} 
	//echo $entry;
	return $entry;}

echo '<div id="files_button_edit" style="left: 84%;	top: 8%; position:fixed;"> 
<form action="" method="post"> <input type="submit" value="edit" name="edit_word" class="buttons" style="height:5%;">
	</div>';
if (isset($_POST['edit_word'])) {
	$_SESSION["letter_counter"]=0;
	header('Location:/editor_word.html');
}
echo '<div id="files_button_restart" style="left: 84%;	top: 2%; position:fixed;"> 
<form action="" method="post"> <input type="submit" value="restart" name="new_session" class="buttons" style="height:5%;">
	</div>';
if (isset($_POST['new_session'])) {
	$_SESSION['usr_dir'] = "books_test";
	$_SESSION["file_counter"] = 0;
	$_SESSION["word_i"] = 'HHEELLOO';
	header('Location:/index.html');
}


echo '<div id="files_button_menu" style="left: 84%;	top: 17%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="menu" name="menu" class="buttons" ">
	</div>';
echo '<div id="files_button_nextp" style="left: 84%; top: 40%; position:fixed;"> 
	<input type="button" class="buttons" value="next page" onclick="alert();">   
	</div>';
	
//-- new file/folder --------------------------------------------------------
echo '<div id="files_button_new"   style="left: 5%;  top: 78%; position:fixed;"> 
	<input type="button" class="buttons" value="new" onclick="new_file();">   
	</div>';
function create_file($fname, $usr_dir) {
	$full_name = $usr_dir."/".$fname.".txt";
	$myfile = fopen($full_name, "w") or die("Unable to open file!");
	chmod($full_name, 0666);
	//$txt = "John Doe";
	//fwrite($myfile, $txt);
	fclose($myfile);
  }
if (isset($_POST['file_name'])) {
	echo $_POST["file_name"];
	if ($_POST["file_name"]!=''){ create_file($_POST["file_name"],$_SESSION['usr_dir']); header('Location:/index.html');}
  }
//-- file options -----------------------------------------------------------
echo '<div id="files_button_foptions" style="left: 33%;	top: 78%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="file options" name="foptions" class="buttons" ">
	</div>';
if (isset($_POST['foptions'])) {
	//echo 'foptions';
	echo '<div id="files_foptions" class="folder" style="left: 33%; top: 20%; position:fixed; width:60%; height:70%"> 
		<form action="" method="post"> <input type="submit" value="delete object" name="delete_obj" class="buttons" style="left: 33%; top: 20%;" >
		<form action="" method="post"> <input type="submit" value="rename object" name="rename" class="buttons" style="left: 65%; top: 20%;" >
		</div>';  
}
if (isset($_POST['delete_obj'])) {
	$entry=find_object($_SESSION["file_counter"],$_SESSION['usr_dir']);
	$filename = $_SESSION['usr_dir'].'/'.$entry;
	if (file_exists($filename)){ 
		rename($filename, 'books_test/trash/'.$entry);}
	header('Location:/index.html');
}
//-- enter button -----------------------------------------------------------
echo '<div id="files_button_enter" style="left: 50%;	top: 78%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="enter" name="enter_obj" class="buttons" ">
	</div>';
if (isset($_POST['enter_obj'])) {
	//echo 'ENTER ';
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
			header('Location:/reader.html');
			//header('Location:/index.html');
			}
		}
	//header('Location:/index.html');
}
//-- next/prev buttons ------------------------------------------------------
echo '<div id="files_button_prev" style="left: 67%;	top: 78%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="prev" name="prevobj" class="buttons" ">
	</div>';
if (isset($_POST['prevobj'])) {
	if ($_SESSION["file_counter"]>0){$_SESSION["file_counter"] -=1;}
	header('Location:/index.html');
}
echo '<div id="files_button_next" style="left: 84%;	top: 78%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="next" name="nextobj" class="buttons">
	</div>';
if (isset($_POST['nextobj'])) {
	//echo 'next';
	if ($_SESSION["file_counter"]<$_SESSION["nentry"]){$_SESSION["file_counter"] +=1;}
	header('Location:/index.html');
}
//---------------------------------------------------------------------------


/*
$filename = $usr_dir.'/test.txt';
if (file_exists($filename)) {
    //echo "The file $filename exists";
    //chmod($filename, 0666);
    if (is_writable($filename)) { //echo 'The file is writable';
		$file = fopen($filename,"w");
		//echo fwrite($file,"Hello World. Testing!");
		fclose($file);
		} 
    else { echo 'The file is not writable'; }
	}
else {
    echo "The file $filename does not exist";
}
*/

?>
