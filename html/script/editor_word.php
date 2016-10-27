<?php
session_start();
$word_len = strlen($_SESSION["word_i"]);
//echo 'LEN-'.$word_len.' COUNTER-'.$_SESSION["letter_counter"];
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

//--  -------------------------------------------------------------- 
echo '<div id="editor_send" style="left: 5%;	top: 30%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="send" name="send_word" class="buttons" ">
	</div>';	
echo '<div id="editor_delete" style="left: 5%;	top: 67%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="delete" name="delete_letter" class="buttons" ">
	</div>';	
if (isset($_POST['delete_letter'])) {
	if ($_SESSION["letter_counter"]>0){
		$_SESSION["letter_counter"] -=1;
		$word = $_SESSION["word_i"]; $c = $_SESSION["letter_counter"];
		$new_word = substr($word, 0, $c).substr($word,$c+1);
		$_SESSION["word_i"] = $new_word;
		}
	header('Location:/editor_word.html');
}
echo '<div id="editor_letters" style="left: 70%;	top: 30%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="letters" name="letters" class="buttons" ">
	</div>';
if (isset($_POST['letters'])) {
	header('Location:/editor_letters.html');
}
echo '<div id="editor_numbers" style="left: 40%;	top: 30%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="numbers" name="numbers" class="buttons" ">
	</div>';
if (isset($_POST['numbers'])) {
	header('Location:/editor_numbers.html');
}
echo '<div id="editor_prev" style="left: 40%;	top: 67%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="prev_letter" name="prev_letter" class="buttons" ">
	</div>';
if (isset($_POST['prev_letter'])) {
	if ($_SESSION["letter_counter"]>0){$_SESSION["letter_counter"] -=1;}
	header('Location:/editor_word.html');
}
echo '<div id="editor_next" style="left: 70%;	top: 67%;  position:fixed;"> 
<form action="" method="post"> <input type="submit" value="next_letter" name="next_letter" class="buttons" ">
	</div>';
if (isset($_POST['next_letter'])) {
	echo 'COUNTER-',$_SESSION["letter_counter"];
	if ($_SESSION["letter_counter"]<strlen($_SESSION["word_i"])){$_SESSION["letter_counter"] +=1;}
	header('Location:/editor_word.html');
}
//--  ----------------------------------------------------------------



?>
