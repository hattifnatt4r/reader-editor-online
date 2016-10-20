<?php

if ($handle = opendir('books_test')) {
    echo "Directory handle: $handle\n";
    echo "Entries:\n";
    /* This is the correct way to loop over the directory. */
    while (false !== ($entry = readdir($handle))) {
        echo "$entry\n";
    }

    closedir($handle);
}
else{echo "bad dir";}

	echo '<br><br>';
	echo 4895553268;
	echo "<br>";
	$x = 10.365;
	var_dump($x);
	echo "<br>";
	echo strlen("Hello world!");
	echo "<br>";
	echo readfile("test.txt");
	echo "<br>";
	$myfile = fopen("test.txt", "r") or die("Unable to open file!");
	echo fread($myfile,filesize("test.txt"));
    fclose($myfile);
    echo "<br>";
    familyName("Jani");
    
    echo "<br>";
    for ($x = 1; $x <= 3; $x++) {
	echo "for: $x <br>";
	}
	
	$x = 1;
	while($x <= 3) {
	  echo "while: $x <br>";
	  $x++;
	} 


function familyName($fname) {
    echo "$fname Refsnes.<br>";
}

?>
