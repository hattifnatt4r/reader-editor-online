<?php
if ($_SESSION["session_reader"]!=10){
    $_SESSION["session_reader"] = 10;
    $_SESSION["reader_counter"] = 0;
    }
//-- go ---------------------------------------------------------------------
if (isset($_POST['reader_menu_go_files'])) {
    header('Location:/index.php');
    }    
if (isset($_POST['reader_menu_go_file1'])) {
    header('Location:/index.php');
    }

if (isset($_POST['freader_save_submit'])) {
    $text = $_POST["freader_save_text"];
    $fname = $_SESSION["filename_opened"];
    $myfile = fopen($fname, "w") or die("Unable to open file!");
    chmod($fname, 0666);
    fwrite($myfile, $text);
    fclose($myfile);
    $_SESSION["file_text"] = $text;
    header('Location:/reader.php');
} 

if (isset($_POST['freader_sendmail_submit'])) {
    $msg = $_POST["freader_save_text"];
    $fname = get_mail_fname(get_usrname(), get_contactname());
    //echo $text;
    $myfile = fopen($fname, "r") or die("Unable to open file!");
    $text = fread($myfile, filesize($fname));
    fclose($myfile);
    $text = $text.' '.$msg;
    //echo '<br> PREV_TEXT: '.$text.'<br>';  
    //echo '<br> MSG: '.$text.'<br>';  
    
    $myfile = fopen($fname, "w") or die("Unable to open file!");
    fwrite($myfile, $text);
    fclose($myfile);
    //echo ' |  |  saved '.$fname;
    
    $fname = $_SESSION["filename_opened"];
    $myfile = fopen($fname, "w") or die("Unable to open file!");
    $name = get_usrname();
    $text = '';
    fwrite($myfile, $text);
    fclose($myfile);
    
    $_SESSION["file_text"] = $text;    
} 

function get_usrname(){
    $usr_dir=$_SESSION['usr_dir'].'/';
    $i1 = strpos($usr_dir,'/');
    $usr_name=substr($usr_dir,$i1+1,strpos($usr_dir,'/',$i1+1)-$i1-1);
    return($usr_name);
}
function get_contactname(){
    $fname = $_SESSION["filename_opened"];
    $i1 = strrpos($fname,'/');
    $name=substr($fname,$i1+1);
    return($name);
}
function get_subdir(){
    $usr_dir=$_SESSION['usr_dir'].'/';
    $i1 = strpos($usr_dir,'/', strpos($usr_dir,'/')+1 );
    $usr_name=substr($usr_dir,$i1+1,strpos($usr_dir,'/',$i1+1)-$i1-1);
    return($usr_name);
}
function get_mail_fname($a,$b){
    $arr = array(); 
    array_push($arr, $a); 
    array_push($arr, $b);
    sort($arr);
    $full_name = "users_mail/".$arr[0].'_'.$arr[1];
    return($full_name);
}
//-- text -------------------------------------------------------------------
//run_reader();
if(isset($_POST["freader_run_submit"])) {
	run_reader();
}

function run_reader(){
	//echo "<br>----------- READER RUN --------------<br>";
	//echo 'opened: '.$_SESSION["filename_opened"];
	$dir = substr($_SESSION["usr_dir"], strpos($_SESSION["usr_dir"], "/")); 
	if ($dir==$_SESSION["usr_dir"]){$dir='';} 
	$fname = substr($_SESSION["filename_opened"], strrpos($_SESSION["filename_opened"], "/")+1);
	//$name = '<em id="file_title" style="font-style:normal;left:1.7vw;position:relative;"><em style="color:#008000;opacity:0.6;">'.$dir.'/ </em>'.$fname.'</em>';
	//echo "<div id='content_box' class='text_scroll_box' >".  
	//"<div id='text_scroll_area' class='text_scroll' align='left' >".$name."<div id='text_from_file' class='reader_text'></div>
	//</div></div>";
	echo "<div hidden id='hidden_text' >".$_SESSION["file_text"]."</div>";
	echo "<div hidden id='hidden_fname' >".$dir.'/'.$fname."</div>";

	if (get_subdir()==='mail'){
	    //$a=get_usrname();  
	    $full_name = get_mail_fname(get_usrname(), $fname);
	    //echo '<div style="position:fixed;top:0%;left:0%;">MAIL: '.$full_name.'</div>';
	    $myfile = fopen($full_name, "r") or die("Unable to open file!");
	    $text = fread($myfile, filesize($full_name));
	    //echo '<br> TEXT: '.$text.'<br>';
	    //echo '<div style="position:fixed;top:0%;left:50%;">MAIL: '.$text.'</div>';
	    fclose($myfile);
	    //echo '<div style="position:fixed;top:5%;left:0%;">MAIL: '.$text.'</div>';
	    echo "<div hidden id='hidden_mail_all' style='position:fixed; top:80%; left:85%'>".$text."</div>";
	    
	    echo "<div hidden id='hidden_mail_archive' >".$text."</div>";
	    echo "<div hidden id='hidden_mail_msg' >".$_SESSION["file_text"]."</div>";
	}

}
?>

