<?php
session_start();
echo '<div id="files_button_edit" style="left: 84%;	top: 2%; position:fixed;"> 
<form action="" method="post"> <input type="submit" value="edit" name="edit" class="buttons" style="height:5%;">
	</div>';

if (isset($_POST['edit'])) {
	echo 'word '.$_SESSION["word_i"];
	header('Location:/index.html');
}

$word = $_SESSION["word_i"]; $c = $_SESSION["letter_counter"];
$output_text = substr($word, 0, $c).'|'.substr($word,$c);
echo '<div id="output_area" class="folder_bkg" value="input" style="left: 2%;  top: 3%; position:fixed; width:75%; height:15%;">   
	'.$output_text.'
	</div>';
echo '<div id="input_area" class="folder_bkg" value="input" style="left: 2%;  top: 21%; position:fixed; width:75%; height:77%;">   
	</div>';


echo '<div id="editor_back" style="left: 84%;	top: 10%; position:fixed;"> 
<form action="" method="post"> <input type="submit" value="back" name="back_letters" class="buttons" style="height:5%;">
	</div>';
if (isset($_POST['back_letters'])) {
	header('Location:/editor_word.html');
}
//-- letters ----------------------------------------------------------------
/*
echo '<div id="editor_letters_1-6" style="left: 5%;	top: 25%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="letters1" name="letters1" class="buttons" >
</div>';
echo '<div id="editor_letters_7-12" style="left: 40%;	top: 25%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="letters2" name="letters2" class="buttons" >
</div>';
echo '<div id="editor_letters_13-18" style="left: 75%;	top: 25%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="letters3" name="letters3" class="buttons" >
</div>';
echo '<div id="editor_letters_19-24" style="left: 5%;	top: 60%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="letters4" name="letters4" class="buttons" >
</div>';
echo '<div id="editor_letters_25-30" style="left: 40%;	top: 60%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="letters5" name="letters5" class="buttons" >
</div>';
echo '<div id="editor_letters_31-36" style="left: 75%;	top: 60%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="letters6" name="letters6" class="buttons" >
</div>';
*/
$arr_letters=array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','z','z','-');
$arr=array('letters1','letters2','letters3','letters4','letters5','letters6');
for ($i=0; $i<count($arr); $i++){
	if (isset($_POST[$arr[$i]])) {
		$a1 = $i*6; 
		$arr_l = $arr_letters;
		$arr2=array($arr_l[$a1],$arr_l[$a1+1],$arr_l[$a1+2],$arr_l[$a1+3],$arr_l[$a1+4],$arr_l[$a1+5]);
		show_letter_set($arr2);
		header('Location:/editor_numbers.html');
	}
}

function show_letter_set($arr){
	$n = count($arr);
	for ($i=0; $i<$n; $i++){
		//echo $i.$arr[$i];
		show_letter($arr[$i], $i);
	}
}
function show_letter($entry, $i){
	$a = 5+($i%3)*25;	
	$b = 24+($i-$i%3)/3*35;
	$style = "align: center;
		left: $a%; top: $b%;
		width: 20%; height: 30%;  " ;	
	//if ($entry==' '){$name='space';}else{$name=$entry;}	
	$name=$entry;
	echo "<div style='$style'> 
		<form action='' method='post'> <input type='submit' value=$entry name=$entry style='$style' class='folder'>
		</div>";  
}

$arr = $arr_letters;
for ($i=0; $i<count($arr); $i++){
	if (isset($_POST[$arr[$i]])) {
		$word = $_SESSION["word_i"]; $c = $_SESSION["letter_counter"];
		$new_word = substr($word, 0, $c).$arr[$i].substr($word,$c);
		$_SESSION["word_i"] = $new_word;
		$_SESSION["letter_counter"] +=1;
		//$_SESSION["word_i"] = $_SESSION["word_i"].$arr[$i];
		$_SESSION["letter_i"] = $arr[$i];
		header('Location:/editor_letters.html');
	}
}
?>
