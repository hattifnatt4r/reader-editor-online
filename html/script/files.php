<?php
$file_counter = 0;

echo '<div class="folder_bkg" >  files </div>';

echo '<div class="folder", style="left: 5%; top: 5%;" >  .. </div>';


echo '<div id="files_button_nextp" style="left: 84%; top: 40%; position:fixed;"> 
	<input type="button" class="buttons" value="next page" onclick="alert();">   
	</div>';
echo '<div id="files_button_menu"  style="left: 84%; top: 5%;  position:fixed;"> 
	<input type="button" class="buttons" value="menu" onclick="alert();">   
	</div>';
echo '<div id="files_button_new"   style="left: 5%;  top: 78%; position:fixed;"> 
	<input type="button" class="buttons" value="new" onclick="new_file();">   
	</div>';

	
echo '<div id="files_button_foptions" style="left: 33%;	top: 78%;  position:fixed;"> 
	<input type="button" class="buttons" value="file options" onclick="alert();">   
	</div>';
echo '<div id="files_button_enter"    style="left: 50%;	top: 78%;  position:fixed;"> 
	<input type="button" class="buttons" value="enter" onclick="alert();">   
	</div>';
echo '<div id="files_button_prev"     style="left: 67%;	top: 78%;  position:fixed;"> 
	<input type="button" class="buttons" value="prev" onclick="alert();">   
	</div>';
echo '<div id="files_button_next"     style="left: 84%;	top: 78%;  position:fixed;"> 
	<input type="button" class="buttons" value="next" onclick="alert();">   
	</div>';


if ($handle = opendir('books_test')) {
    //echo "Directory handle: $handle\n";
    //echo "Entries:<br>";
    $i = 1;
    /* This is the correct way to loop over the directory. */
    while (false !== ($entry = readdir($handle))) {
        if ($entry!=".."){
			if ($entry!="."){show_file($entry, $i);$i = $i+1;} }
    }
    closedir($handle);
}
else{echo "bad dir";}

function show_file($entry, $i){
	$a = 5+($i%4)*20;	
	$b = 5+($i-$i%4)/4*24;
	$style = "align: center;
		left: $a%;
		top: $b%;
		" ;		
	echo "<div id='zoomline' class='folder' style='$style' > 
	$entry
	</div>";
}

function create_file($fname) {
	echo 'create file';
	//$fname = "books_test/test_3.txt";
	$full_name = "books_test/".$fname.".txt";
	echo 'create file:'.$full_name;
	$myfile = fopen($full_name, "w") or die("Unable to open file!");
	chmod($full_name, 0666);
	$txt = "John Doe";
	fwrite($myfile, $txt);
	fclose($myfile);
	//echo 'create file';
  }
function create_folder($fname) {
	//$fname = "books_test/test_3.txt";
	$myfile = fopen($fname, "w") or die("Unable to open file!");
	//chmod($filename, 0666);
	$txt = "John Doe";
	fwrite($myfile, $txt);
	fclose($myfile);
	echo 'create folder';
	header('Location:/index.html');
  }
 if (isset($_POST['file_name'])) {
	echo $_POST["file_name"];
	if ($_POST["file_name"]!=''){ create_file($_POST["file_name"]); header('Location:/index.html');}
  }

if (isset($_POST['fname'])) {
    runMyFunction();
  }

$filename = 'books_test/test.txt';
if (file_exists($filename)) {
    echo "The file $filename exists";
    //chmod($filename, 0666);
    if (is_writable($filename)) { echo 'The file is writable';
		$file = fopen($filename,"w");
		echo fwrite($file,"Hello World. Testing!");
		fclose($file);
		} 
    else { echo 'The file is not writable'; }
	}
else {
    echo "The file $filename does not exist";
}


?>
