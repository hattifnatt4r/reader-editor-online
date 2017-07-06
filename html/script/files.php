<?php

session_start();
if ($_SESSION["session"]!=10){
	 //echo 'SESSION_START';
	getUserData();
    $_SESSION["session"] = 10;
    
    $_SESSION['usr_dir'] = "users/common";
    $_SESSION['usr_home'] = "users/common";
    $_SESSION["file_counter"] = 0;
    $_SESSION["word_i"] = 'HHEELLOO';
    $_SESSION['nentry'] = 0;
    $_SESSION["letter_i"] = 'a';
    $_SESSION["file_text"] = '';
    $_SESSION["editor_exit"] = '';
    
    $_SESSION["filename_opened"] = '';
    $_SESSION["files_arr"] = array();
    
    $_SESSION["alert"] = "";
}
//run_files();

//-- files ------------------------------------------------------------------
function run_files(){
	make_files_array();
	echo "<div hidden id='hidden_files_nentry' style='position:fixed; top:67%; left:85%'>".$_SESSION['nentry']."</div>";
	echo "<div hidden id='hidden_files_dir' style='position:fixed; top:60%; left:85%'>".$_SESSION['usr_dir']."</div>";
	
	$show_arr = ""; $i=0;
	foreach($_SESSION["files_arr"] as $entry){ $file_i=show_file($entry, $i); $show_arr=$show_arr.$file_i; $i=$i+1; }
	
	echo "<div id='files_area_box' class='text_scroll_box' style='height:73%;'> <div class='text_scroll' align='left' >
	<div id='files_area' class='reader_text'>".$show_arr."</div></div></div>";
	
	echo '<div id="files_zoom_box" class="reader_zoom_box">  
	<div id="files_zoom_text" class="text_zoom">..</div> </div>';
	
	$entry = find_object($_SESSION["file_counter"], $_SESSION['usr_dir']);
	echo '<div hidden id="php_alert">'.$_SESSION["alert"]."</div>";
	$_SESSION["alert"] = "";
}
function make_files_array(){
	$arr_dir=array(); $arr_file=array(); $arr_entries=array(); 
	array_push($arr_dir, '..');
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
	    //$newmail = show_file(' ', $_SESSION['nentry']+1); //$show_arr=$show_arr.$newmail;
	    //echo "<div  id='hidden_newmail' >".$newmail."</div>";
	} else {echo "bad dir";}
	$_SESSION["files_arr"]=$arr_entries;
}

function show_file($entry, $i){
    $left = 1; $right = 64.5; $xn=4; $top=-7; 
    $xwidth=14; $ywidth=20; $yspace=6;
    $xspace = ( $right-$left-$xn*$xwidth )/($xn-1); 
    $x = $left + ($xspace+$xwidth)* ($i%$xn);
    $y = $top +  ($yspace+$ywidth)*($i-$i%$xn)/$xn;
    $style = "position:absolute;
        left: ".$x."vw; top: ".$y."vh;
        width:".$xwidth."vw; height:".$ywidth."vh;
        " ;        
    $filename = $_SESSION['usr_dir'].'/'.$entry;
    if (file_exists($filename)){
        if (is_dir($filename)){$class='files files-dir';$title='dir';} else { $class='files files-txt';$title='txt'; }
        //if ($entry=='readme.txt'){ $class = 'files attention'; }
    }//else{ $class='files attention'; $title=''; $entry='new <br> contact'; }
    if (strpos($entry,'~')!==false){ 
        $entry = str_replace('~','',$entry); $class='files attention';
         }
    $file_i = '<div id="fileid_'.$i.'"  class="'.$class.'" onclick="files_scroll('.$i.');"  style="'.$style.'" title="'.$title.'">'.$entry.'</div>' ;
    return($file_i);
}
//---------------------------------------------------------------------------
function find_object($i_obj, $usr_dir){
    $entry = $_SESSION["files_arr"][$i_obj];
    //echo '<div style="position:fixed;top:97%;">'.$entry.'</div>';
    return $entry;
}

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
if (isset($_POST['ffiles_createtxt_submit'])) {
    $text = $_POST["ffiles_edit_text"];
    echo 'TEXT: '.$text.' '; 
    if ($text!='' || $text!=' ' || $text!='  '){
        create_file($text,$_SESSION['usr_dir']); 
        header('Location:/index.html'); 
    }
}
if (isset($_POST['ffiles_createdir_submit'])) {
    $text = $_POST["ffiles_edit_text"];
    echo 'TEXT: '.$text.' '; 
    if ($text!='' || $text!=' ' || $text!='  '){
        create_dir($text,$_SESSION['usr_dir']); 
        header('Location:/index.html'); 
    }
}

if (isset($_POST['ffiles_addmail_submit'])) {
    $value = $_POST['ffiles_addmail_submit'];
    $contact_name = $_POST["ffiles_edit_text"];
    
    $success = 1;
    $usr_dir=$_SESSION['usr_dir'];
    $usr_name = get_usrname();
    $full_name = get_mail_fname($usr_name,$contact_name);
    
    //-- Check if contact user exists --------------------------------------
    if (!file_exists('users/'.$contact_name)){                           
		echo $full_name.' There is no user with this name <br>'; 
		$success = 0; $alert = "There is no user with this name";
	}
    if ($success==1 && file_exists($full_name)) { $success = 0; $alert = "Warning: Main file already exists"; }
    
    //-- Create file in mail-storage ---------------------------------------
    if ($success==1){                                                    // Create file in mail-storage
        $myfile = fopen($full_name, "w") or die(" | Unable to open file ".$full_name." | ");
        chmod($full_name, 0666);
        fclose($myfile);
        if (!file_exists($full_name)){ $success = 0; $alert = "Cannot create main file"; }
	}
	
	//-- Create mail-file in user directory --------------------------------
	$local_name = $usr_dir.'/'.$contact_name;                            
	if ($success==1 && file_exists($local_name) ) { $success = 0; $alert = "Local file already exists"; }
	elseif ($success==1){
        $myfile = fopen($local_name, "w") or die(" | Unable to open file ".$local_name." | ");
        $text = '';
        fwrite($myfile, $text);
        chmod($local_name, 0666);
        fclose($myfile);
        if (!file_exists($local_name)){ $success = 0; $alert = "Cannot create local file"; }
	}
	
	//-- Create mail-file in contact-user directory ------------------------
	$local_name = 'users/'.$contact_name.'/mail/'.$usr_name;             
	if ($success==1 && file_exists($local_name) ) { $success = 0; $alert = "2d local file already exists"; }
	elseif ($success==1){
        $myfile = fopen($local_name, "w") or die(" | Unable to open file ".$local_name." | ");
        $text = '';
        fwrite($myfile, $text);
        chmod($local_name, 0666);
        fclose($myfile);
        if (!file_exists($local_name)){ $success = 0; $alert = "Cannot create 2d local file"; }
	}
    
    $_SESSION["alert"] = $alert;
    header('Location:/index.html'); 
}
function get_usrname(){
    $usr_dir=$_SESSION['usr_dir'];
    $i1 = strpos($usr_dir.'/','/');
    $usr_name=substr($usr_dir.'/',$i1+1,strpos($usr_dir.'/','/',$i1+1)-$i1-1);
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
//-- file options -----------------------------------------------------------
if (isset($_POST["ffiles_delete_submit"])) {
    $_SESSION["file_counter"]=$_POST["ffiles_iter"];
	$entry=find_object($_SESSION["file_counter"],$_SESSION['usr_dir']);
	$filename = $_SESSION['usr_dir'].'/'.$entry;
	if (file_exists($filename)){ 
		rename($filename, $_SESSION['usr_home'].'/trash/'.$entry);}
	header('Location:/index.html');
}		
if (isset($_POST["ffiles_edit_submit"])) {
	$_SESSION["file_counter"]=$_POST["ffiles_iter"];	
	//echo 'EDIT';
	//$text = $_POST["files_options_text"];
	$text = $_POST["ffiles_edit_text"];
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
}
if (isset($_POST["ffiles_cleanhtml_submit"])) {	
	$_SESSION["file_counter"]=$_POST["ffiles_iter"];
	$entry=find_object($_SESSION["file_counter"],$_SESSION['usr_dir']);
	$filename = $_SESSION['usr_dir'].'/'.$entry;
	echo '<div style="position:fixed;top:0%;left:0%;z-order:1;width:20%;">'.$filename.'</div>';
	$myfile = fopen($filename, "r") or die("Unable to open file!");
	$txt = fread($myfile, filesize($filename));
	//fwrite($myfile, $txt);
	fclose($myfile);
	$txt = clean_html($txt);
	$fname = substr($filename,0,strpos($filename,'.html')).'.txt';
	echo '<div style="position:fixed;top:0%;left:15%;z-order:1;width:20%;">'.$fname.'</div>';
	$myfile = fopen($fname, "w") or die("Unable to open file!");
	chmod($fname, 0666);
	fwrite($myfile, $txt);
	fclose($myfile);
	header('Location:/index.html'); 
}

//-- enter button ---------------------------------------------------

if (isset($_POST['ffiles_enter_submit'])) {
    $_SESSION["file_counter"]=$_POST["ffiles_iter"];
    $entry=find_object($_SESSION["file_counter"],$_SESSION['usr_dir']);
    $filename = $_SESSION['usr_dir'].'/'.$entry;
    //echo ' | ENTER '.$_SESSION["file_counter"]." ".$entry." | ";
    //unset($_POST);
    
	if ($_SESSION["file_counter"]==0){
		if ($_SESSION["usr_dir"]!=$_SESSION['usr_home']){
			$new_dir = substr($_SESSION["usr_dir"],0,strrpos($_SESSION["usr_dir"], "/"));
			$_SESSION["usr_dir"] = $new_dir;
			//echo '  | GO-BCK: '.$_SESSION['usr_dir'];
			//$_SESSION['file_counter'] = 0;
			header('Location:/index.html');
			//run_files();
		}
	}else{
		if (is_dir($filename)){ 
			$_SESSION['usr_dir'] = $filename;
			//echo ' | GO-DIR: '.$_SESSION['usr_dir']." ".$_SESSION["file_counter"]." | ";
			$_SESSION['file_counter'] = 0;
			header('Location:/index.html');
			//run_files();
		}else{
			$myfile = fopen($filename, "r") or die("Unable to open file!");
			$txt = fread($myfile, filesize($filename));
			fclose($myfile);
			$_SESSION["file_text"] = $txt;
			//echo filesize($filename).$filename.'TEXT:'.$txt;
			$_SESSION["filename_opened"] = $filename;
			header('Location:/reader.html');
		}
	}
	//echo '  | NEW-DIR2: '.$_SESSION['usr_dir']." | ";
}

//-- login ------------------------------------------------------------------

if (isset($_POST['ffiles_userlogin_submit'])) {
    //$name = $_POST['loginname_text_name'];
    //$pass = $_POST['loginpass_text_name'];
    $name = $_POST['ffiles_username'];
    $pass = $_POST['ffiles_userpass'];
    $value = $_POST['ffiles_userlogin_submit'];
    //echo '<div style="position:fixed;top:0.5%;left:0%;z-order:1">'.'LOGIN '.$value.' name: '.$name.' pass: '.$pass.'</div>';
    if ($value=='new'){
        //echo '<div style="position:fixed;top:0.5%;left:1%;z-order:1">'.'NEW LOGIN'.'</div>';
        $fname = "data/login.json";
        $myfile = fopen($fname, "r") or die("Unable to open $fname !");
        $json = fread($myfile, filesize($fname));
        fclose($myfile);
        //echo '<div style="position:fixed;top:0.5%;left:10%;z-order:1">'.$json.'</div>';
        $text = substr($json,0,strrpos($json, "]")).  ', {"name":"'.$name.'","password":"'.$pass.'"}' .']}';
        //echo '<div style="position:fixed;top:2.5%;left:10%;z-order:0;width:70%;">'.$text.'</div>';
        $myfile = fopen($fname, "w") or die("Unable to open $fname !");
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

//-- mail ------------------------------------------------------------------

 if (isset($_REQUEST['ffiles_mail_submit']))  {
    echo '<div style="position:fixed;top:0.5%;left:0%;z-order:1">'.'MAIL '.'</div>';
    //Email information
    $admin_email = "dolgareva.ma@yandex.ru";
    //$admin_email = "dolgareva.ma@gmail.com";
    $email = $_REQUEST['mail_submit_name'];
    $email = 'admin@hedgehoginafog.xyz';
    $subject = 'test';
    $comment = 'Text';
    //send email
    mail($admin_email, "test", $comment, "From:" . $email);
    if (@mail($admin_email, "test", $comment)){
        echo '<div style="position:fixed;top:2.5%;left:0%;z-order:1">'.'SUCCESS '.'</div>'; }
    else{
        echo '<div style="position:fixed;top:2.5%;left:0%;z-order:1">'.'FAIL '.'</div>'; }
    //header('Location:/index.html');
}

//-- wipmania ----------------------------------------------------------------


function getUserData(){    
    $fname = "data/wipmania.txt";
    $myfile = fopen($fname, "r") or die("UUUUnable to open file!");
    $json = fread($myfile, filesize($fname));
    chmod($fname, 0666);
    fclose($myfile);
    
    $ip_i = getUserIP();
    $country = file_get_contents('http://api.wipmania.com/'.$ip_i.'?google.com');
    //$wipmania = file_get_contents('http://api.wipmania.com/jsonp?callback=?') ;
    //$n = strpos($wipmania, '"country":"')+11;
    //$country = substr($wipmania,$n, strpos($wipmania, '"',$n+1)-$n );
    //echo '<div style="position:fixed;top:0%;left:0%;z-order:1;width:70%;">'.$ip_i.' '.$country.' '.gmdate("Y-m-d H:i:s").'</div>';
    $text = $json.$ip_i.' '.$country.' '.gmdate("Y-m-d H:i:s")."\r\n";
    $myfile = fopen($fname, "w") or die("UUUUnable to open file!");
    fwrite($myfile, $text);
    fclose($myfile);
    //header('Location:/index.html');
}


function getUserIP(){
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];
    if(filter_var($client, FILTER_VALIDATE_IP)) { $ip = $client; }
    elseif(filter_var($forward, FILTER_VALIDATE_IP)) { $ip = $forward; }
    else{ $ip = $remote; }
    return $ip;
}

//-- upload file -------------------------------------------------------------

if(isset($_POST["ffiles_upload_submit"])) {
    $target_dir = $_SESSION['usr_dir'];
    $target_file = $target_dir .'/'. basename($_FILES["ffiles_upload_choose"]["name"]);
    echo '<div style="position:fixed;top:5%;left:0%;z-order:1;width:70%;">'.$target_file.'</div>';
    $uploadOk = 1;
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
    $check = filesize($_FILES["ffiles_upload_choose"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image.";
        $uploadOk = 1;
    
        // Check if file already exists
        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }// Check file size
        if ($_FILES["ffiles_upload_choose"]["size"] > 500000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }// Allow certain file formats
        if($imageFileType != "html" && $imageFileType != "txt" ) {
            echo "Sorry, only HTML and TXT files are allowed.";
            $uploadOk = 0;
        }
    } else { $uploadOk = 0; echo "Bad size."; }

    if ($uploadOk == 0) { echo "Sorry, your file was not uploaded."; } 
    else {
        if (move_uploaded_file($_FILES["ffiles_upload_choose"]["tmp_name"], $target_file)) {
            echo "The file ". basename( $_FILES["ffiles_upload_choose"]["name"]). " has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
    header('Location:/index.html');
}

if(isset($_POST["python_submit_name"])) {
    echo '<div style="position:fixed;top:0%;left:0%;z-order:1;width:20%;">'.'PYTHON'.'</div>';
    $fname = '/storage/h2/291/23291/public_html/script/test.py';
    //$fname = 'script/test.py';
    $fname_res = 'data/python_test.txt';
    chmod($fname, 0777);
    $myfile = fopen($fname_res, "w") or die("Unable to open file!");
    fclose($myfile);
    chmod($fname_res, 0666);
    
    //$command = escapeshellcmd($fname);
    //$output = shell_exec($command);
    //$output = shell_exec("env -i $fname");
    //$output = exec($fname);
    //$output = exec($fname);
    //$output = system("python $fname");
    //var_dump(shell_exec('ls -l'));
    //var_dump(shell_exec('whoami'));
    //$output = shell_exec('ls -l 2>&1 1> /dev/null');
    //$output = shell_exec('ls -l > /dev/null &');
    //$output = exec('env -i pwd > /dev/null &');
    //chmod($fname_res, 0666);
    //$process = new Process('ls -al');
    //if ($process.status()){echo "The process is currently running";}
    //else {echo "The process is NOT running.";}
    $output = shell_exec('ls -lart');
    echo "<pre>$output</pre>";
    echo '<div style="position:fixed;top:0%;left:20%;z-order:1;width:20%;">'.$output.'</div>';
    //header('Location:/index.html');
}

//-- clean html ------------------------------------------------------------

function clean_html($txt){
    $nl = substr($txt, strpos($txt,'@page')-2,1);
    $i1 = strpos($txt,'<body');
    $i2 = strpos($txt,'>',$i1+1);
    $txt = '<html><body><div>'.substr($txt,$i2+1);
    //$txt = str_replace('<span',$nl.'<span',$txt);
    
    $arr1 = array('<span','style="','class="','id="','<!--');
    $arr2 = array('>','"','"','"','-->');
    
    for ($i=0; $i<count($arr1); $i++){
        $proceed=True;
        while ($proceed){
            if (strpos($txt,$arr1[$i])==null) { $proceed=False; }
            else{
                $i1 = strpos($txt,$arr1[$i]);
                $i2 = strpos($txt,$arr2[$i],$i1+strlen($arr1[$i]));
                $txt2 = substr($txt, 0, $i1).substr($txt, $i2+strlen($arr2[$i]));
                $txt = $txt2;
            }
        }
    }
    $txt = str_replace('</span>','',$txt);
    $txt = str_replace('<span',$nl.'<span',$txt);
    $txt = replace_rec($txt,'  ',' ');
    
    
    $txt = str_replace('> ','>',$txt);
    $txt = str_replace(' >','>',$txt);
    $txt = str_replace(' <','<',$txt);
    $txt = str_replace('< ','<',$txt);
    $txt = str_replace(' />','/>',$txt);
    $txt = str_replace('<a>',' ',$txt);
    $txt = str_replace('</a>',' ',$txt);
    $txt = str_replace('<a/>',' ',$txt);
    $txt = replace_rec($txt, '<div> </div>',' ');
    
    $txt = str_replace('<p','<div',$txt);
    $txt = str_replace('</p','</div',$txt);
    $txt = str_replace($nl,'',$txt);
    
    $txt = str_replace('</div>','</div><div>',$txt);
    $txt = str_replace('<div>','</div><div>',$txt);
    $txt = replace_rec($txt, '<div><div>','<div>');
    $txt = replace_rec($txt, '</div></div>','</div>');
    $txt = replace_rec($txt, '<div></div>','');
    
    $txt = str_replace('<body></div>','<body>',$txt);
    $txt = str_replace('<div><body>','</body>',$txt);
    
    $txt = str_replace('</div>','<br> ',$txt);
    $txt = str_replace('<div>','',$txt);
    $txt = str_replace('<br>','<br>'.$nl,$txt);
    
    $txt = str_replace('<html><body>','',$txt);
    $txt = str_replace('</body></html>','',$txt);
    
    return ($txt);
}
function replace_rec($txt,$a,$b){
    $proceed=True;
    while ($proceed){
        $txt = str_replace($a,$b,$txt);
        if (strpos($txt,$a)==null) { $proceed=False;}
    }
    return($txt);
}

run_files();
?>
