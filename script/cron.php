<?php

if(isset($_POST["ffiles_test_submit"])) {
	echo ' \n Clean_tmp';
	$dir = "users/guests";
	$delay = 5;

	
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

?>

