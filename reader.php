<?php
session_start();
if ($_SESSION["session_reader"]!=10){
    $_SESSION["session_reader"] = 10;
    $_SESSION["reader_counter"] = 0;
    $_SESSION["alert"] = "";
    }
//-- go ---------------------------------------------------------------------

if (isset($_POST['freader_save_submit'])) {
    $text = $_POST["freader_save_text"];
    $fname = $_SESSION["filename_opened"];
    $myfile = fopen($fname, "w") or die("Unable to open file!");
    chmod($fname, 0666);
    fwrite($myfile, $text);
    fclose($myfile);
    $_SESSION["file_text"] = $text;
} 

if (isset($_POST['freader_sendmail_submit'])) {
    $msg = $_POST["freader_save_text"];
    $fname = get_mail_fname(get_usrname(), get_contactname());
    $myfile = fopen($fname, "r") or die("Unable to open file!");
    $text = fread($myfile, filesize($fname));
    fclose($myfile);
    $text = $text.' '.$msg;
    
    $myfile = fopen($fname, "w") or die("Unable to open file!");
    fwrite($myfile, $text);
    fclose($myfile);
    
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
if(isset($_POST["freader_run_submit"])) {
	$_SESSION["alert"] = "RUN";
}

function run_reader(){
	$filename = $_SESSION["filename_opened"];
	$myfile = fopen($filename, "r") or die("Unable to open file!");
	$_SESSION["file_text"] = fread($myfile, filesize($filename));
	fclose($myfile);
			
	$dir = substr($_SESSION["usr_dir"], strpos($_SESSION["usr_dir"], "/")); 
	if ($dir==$_SESSION["usr_dir"]){$dir='';} 
	$fname = substr($_SESSION["filename_opened"], strrpos($_SESSION["filename_opened"], "/")+1);
	
	echo "<div id='hidden_text' >".$_SESSION["file_text"]."</div>".
		 "<div id='hidden_fname' >".$dir.'/'.$fname."</div>";

	if (get_subdir()==='mail'){
	    $full_name = get_mail_fname(get_usrname(), $fname);
	    $myfile = fopen($full_name, "r") or die("Unable to open file!");
	    $text = fread($myfile, filesize($full_name));
	    fclose($myfile);
	    echo "<div hidden id='hidden_mail_all'>".$text."</div>";
	    
	    echo "<div hidden id='hidden_mail_archive' >".$text."</div>";
	    echo "<div hidden id='hidden_mail_msg' >".$_SESSION["file_text"]."</div>";
	}
}

run_reader();

?>

