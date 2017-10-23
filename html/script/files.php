<?php
//echo $_SESSION["session"];
//echo '| id_prev: '.$_SESSION["session_id_prev"].' | ';
//echo session_id();
if ($_SESSION["session_id_prev"] !== session_id()){
	//echo ' NEW SESSION ';
	$_SESSION['usr_dir'] = "users/guests/".session_id();
	recurse_copy('users/common_backup',$_SESSION['usr_dir']);
    chmod($_SESSION['usr_dir'], 0777);
//}
//if ($_SESSION["session"]!==10){
	 //echo 'SESSION_START';
	//getUserData();
    //$_SESSION["session"] = 10;
    
    //$_SESSION['usr_dir'] = "users/common";
    //$_SESSION['usr_home'] = "users/common";
    $_SESSION['usr_home'] = "users/guests/".session_id();
    $_SESSION["file_counter"] = 0;
    $_SESSION["word_i"] = 'HHEELLOO';
    $_SESSION['nentry'] = 0;
    $_SESSION["letter_i"] = 'a';
    $_SESSION["file_text"] = '';
    $_SESSION["editor_exit"] = '';
    
    $_SESSION["filename_opened"] = '';
    $_SESSION["files_arr"] = array();
    
    $_SESSION["alert"] = "";
    $_SESSION["session_id_prev"] = session_id();
    //$_SESSION["submit_any"] = "ok";
}
//run_files();
//if (!is_writable("users/guests/")) { echo " | 'users/guests/' not writable";  }
if (!is_writable("users/")) { echo " | 'users/' not writable";  }
if (!is_writable("users_mail/")) { echo " | 'users_mail/' not writable";  }
if (!is_writable("data/login.json")) { echo " | 'data/login.json' not writable";  }

if (strpos($_SESSION['usr_home'], "users/guests/")!=false ){
	$fname = $_SESSION['usr_home']."/php_session.txt";
	$myfile = fopen($fname, "r") or die("Unable to open file!");
	$text = fread($myfile, filesize($fname));
	fclose($myfile);
	$myfile = fopen($fname , "w") or die("Unable to open file!");
	$time = time();
	fwrite($myfile, time());
	//echo ' | time: '.$text.' - '.$time.' - '.(string)($time-(int)$text);
	fclose($myfile);
}

if(isset($_POST["ffiles_test_submit"])) {
	echo ' \n Clean_tmp';
	$dir = "users/guests";
	$delay = 2;

	if ($handle = opendir($dir)) {
		foreach(scandir($dir) as $entry) {
			echo '<br>'.$entry;
			if ($entry!=".." && $entry!="."){
				$time = time();
				$fname = $dir.'/'.$entry.'/php_session.txt';
				$myfile = fopen($fname, "r") or die("Unable to open file!");
				$text = fread($myfile, filesize($fname));
				echo ' | time: '.$text.' - '.$time.' - '.(string)($time-(int)$text);
				
				if ($time-(int)$text > $delay) { 
					rmdir($dir.'/'.$entry);
					//echo rmdir($dir.'/'.$entry.'/');
					delete_files($dir.'/'.$entry.'/');
					//echo $entry.' is DELETED';
				} 
			}
		}
		
		closedir($handle);
	}
}

function delete_files($target) {
    if(is_dir($target)){
        $files = glob( $target . '*', GLOB_MARK ); //GLOB_MARK adds a slash to directories returned
        
        foreach( $files as $file )
        {
            delete_files( $file );      
        }
      
        rmdir( $target );
    } elseif(is_file($target)) {
        unlink( $target );  
    }
}

//-- files ------------------------------------------------------------------
function run_files(){
	make_files_array();
	echo "<div hidden id='hidden_files_nentry'>".$_SESSION['nentry']."</div>";
	echo "<div hidden id='hidden_files_dir'>".$_SESSION['usr_dir']."</div>";
	
	$show_arr = ""; $i=0;
	foreach($_SESSION["files_arr"] as $entry){ $file_i=show_file($entry, $i); $show_arr=$show_arr.$file_i; $i=$i+1; }
	
	echo "<div id='content_box' class='text_scroll_box' style='position:fixed;height:73%;top:0%;' align='top'> 
	<div class='text_scroll' style='top:-8.4%;left:0vw;' align='left' >
	<div id='files_array' class='reader_text' style='top:0;left:0;visibility:hidden;'>".$show_arr."</div></div></div>";
	
	echo '<div id="zoom_box" class="text_zoom_box">  
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
	        if ($entry!=".." && $entry!="." && $entry!="php_session.txt" ) { 
	            $i = $i+1; 
	            $filename = $_SESSION['usr_dir'].'/'.$entry;
	            if (is_dir($filename)){
					array_push($arr_dir,$entry);
				} else{array_push($arr_file,$entry);}    
	        } 
	    }
	    $_SESSION['nentry'] = $i-1;
	    closedir($handle);
	    $arr_entries = array_merge($arr_dir,$arr_file);
	    $i=0;
	} else {echo "bad dir";}
	$_SESSION["files_arr"]=$arr_entries;
}

function show_file($entry, $i){
    $left = 2.5; $right = 65; $top=0; 
    $ywidth=16.5; $yspace=9;
    $xwidth=$ywidth*1.1;
    $xspace = 1;
    $xn = floor(($right-$left)/($xspace+$xwidth)); 
    $n_y = ($i-$i%$xn)/$xn;
    $x = $left + ($xspace+$xwidth)* ($i%$xn);
    $y = $top +  ($ywidth+$yspace)*$n_y;
    $style = "position:absolute;
        left: ".$x."vw; top: ".$y."vh;
        width:".$xwidth."vh; height:".$ywidth."vh;
        " ;        
    $filename = $_SESSION['usr_dir'].'/'.$entry;
    if (file_exists($filename)){
        if (is_dir($filename)){$class='files_pic files-dir';$title='dir';} else { $class='files_pic files-txt';$title='txt'; }
    }
    if (strpos($entry,'~')!==false){ 
        $entry = str_replace('~','',$entry); $class='files attention';
         }
    $file_i = '<div id="fileid_'.$i.'" onclick="files_scroll('.$i.');"  class="files" style="'.$style.'" title="'.$title.'" align="center">'
    .'<div id="fileid_'.$i.'_pic"  class="'.$class.'" ></div>'
    .'<div id="fileid_'.$i.'_name"  class="files_name" >'.$entry.'</div> </div>' ;
    return($file_i);
}
//---------------------------------------------------------------------------
function find_object($i_obj, $usr_dir){
	make_files_array();
    $entry = $_SESSION["files_arr"][$i_obj];
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
        echo "<div hidden id='php_goto'>"."index.php"."</div>";
    }
}
if (isset($_POST['ffiles_createdir_submit'])) {
    $text = $_POST["ffiles_edit_text"];
    echo 'TEXT: '.$text.' '; 
    if ($text!='' || $text!=' ' || $text!='  '){
        create_dir($text,$_SESSION['usr_dir']); 
        echo "<div hidden id='php_goto'>"."index.php"."</div>";
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
    echo "<div hidden id='php_goto'>"."index.php"."</div>";
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
	//header('Location:/index.php');
	echo "<div hidden id='php_goto'>"."index.php"."</div>";
}	
if (isset($_POST["ffiles_past_submit"])) {
	$fname = $_POST["ffiles_copyfname_text"];
	$fdir = $_POST["ffiles_copyfdir_text"];
	$filename = 'users'.$fdir.'/'.$fname;
	$newfile = $_SESSION['usr_dir'].'/'.$fname;
	$k=1;
	$i = strrpos($newfile, ".");
	$newfile_final = $newfile;
	while (file_exists($newfile_final)){
		$newfile_final = substr($newfile, 0, $i).'('.$k.')'.substr($newfile, $i);
		$k+=1;
	}
	echo $filename.' | '.$newfile_final;
	copy($filename, $newfile_final);
	//header('Location:/index.php');
	echo "<div hidden id='php_goto'>"."index.php"."</div>";
}		
if (isset($_POST["ffiles_edit_submit"])) {
	$_SESSION["file_counter"]=$_POST["ffiles_iter"];	
	$text = $_POST["ffiles_edit_text"];
	if ($text!='' || $text!=' ' || $text!='  '){
		$entry=find_object($_SESSION["file_counter"],$_SESSION['usr_dir']);
		$filename = $_SESSION['usr_dir'].'/'.$entry;
		$filename_new = $_SESSION['usr_dir'].'/'.$text;
		if (!is_dir($filename)){$filename_new=$filename_new.'.txt';}
		if (file_exists($filename)){ 
			rename($filename, $filename_new);}
		echo "<div hidden id='php_goto'>"."index.php"."</div>";
	}
}
if (isset($_POST["ffiles_cleanhtml_submit"])) {	
	$_SESSION["file_counter"]=$_POST["ffiles_iter"];
	$entry=find_object($_SESSION["file_counter"],$_SESSION['usr_dir']);
	$filename = $_SESSION['usr_dir'].'/'.$entry;
	echo '<div style="position:fixed;top:0%;left:0%;z-order:1;width:20%;">'.$filename.'</div>';
	$myfile = fopen($filename, "r") or die("Unable to open file!");
	$txt = fread($myfile, filesize($filename));
	fclose($myfile);
	$txt = clean_html($txt);
	$fname = substr($filename,0,strpos($filename,'.php')).'.txt';
	echo '<div style="position:fixed;top:0%;left:15%;z-order:1;width:20%;">'.$fname.'</div>';
	$myfile = fopen($fname, "w") or die("Unable to open file!");
	chmod($fname, 0666);
	fwrite($myfile, $txt);
	fclose($myfile);
	echo "<div hidden id='php_goto'>"."index.php"."</div>";
}

//-- enter button ---------------------------------------------------

if (isset($_POST['ffiles_enter_submit'])) {
    $_SESSION["file_counter"]=intval($_POST["ffiles_iter"]);
    $entry=find_object($_SESSION["file_counter"],$_SESSION['usr_dir']);
    $filename = $_SESSION['usr_dir'].'/'.$entry;
    
	if ($_SESSION["file_counter"]==0){
		if ($_SESSION["usr_dir"]!=$_SESSION['usr_home']){
			$new_dir = substr($_SESSION["usr_dir"],0,strrpos($_SESSION["usr_dir"], "/"));
			$_SESSION["usr_dir"] = $new_dir;
			echo "<div hidden id='php_goto'>"."index.php"."</div>";
		}
	}else{
		if (is_dir($filename)){ 
			$_SESSION['usr_dir'] = $filename;
			$_SESSION['file_counter'] = 0;
			echo "<div hidden id='php_goto'>"."index.php"."</div>";
		}else{
			$myfile = fopen($filename, "r") or die("Unable to open file!");
			$txt = fread($myfile, filesize($filename));
			fclose($myfile);
			$_SESSION["file_text"] = $txt;
			$_SESSION["filename_opened"] = $filename;
			echo "<div hidden id='php_goto'>"."reader.php"."</div>";
		}
	}
}

//-- login ------------------------------------------------------------------

if (isset($_POST['ffiles_userlogin_submit'])) {
    $name = $_POST['ffiles_username'];
    $pass = $_POST['ffiles_userpass'];
    $value = $_POST['ffiles_userlogin_submit'];
    
    if ($name=="guest"){ $name = "guests/".session_id(); }
    
    if ($value=='new'){
        $fname = "data/login.json";
        $myfile = fopen($fname, "r") or die("Unable to open $fname !");
        $json = fread($myfile, filesize($fname));
        fclose($myfile);
        $text = substr($json,0,strrpos($json, "]")).  ', {"name":"'.$name.'","password":"'.$pass.'"}' .']}';
        $myfile = fopen($fname, "w") or die("Unable to open $fname !");
        fwrite($myfile, $text);
        fclose($myfile);
        recurse_copy('users/common_backup',"users/".$name);
        chmod("users/".$name, 0777);
    }
    $_SESSION['usr_dir'] = "users/".$name;
    $_SESSION['usr_home'] = "users/".$name;
    //header('Location:/index.php');
    echo "<div hidden id='php_goto'>"."index.php"."</div>";
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
    //header('Location:/index.php');
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
    //header('Location:/index.php');
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
    //header('Location:/index.php');
    echo "<div hidden id='php_goto'>"."index.php"."</div>";
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
    //header('Location:/index.php');
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
