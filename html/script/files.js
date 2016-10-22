function new_file(){
	//alert('hello');
	//text = '<input type="button" class="buttons" value="folder" onclick="alert();" style="width:32%"> ';
	text = '<form action="" class="buttons" method="post" style="width:32%"> <input type="text" name="dir_name"><br> <input type="submit" value="button">';
	var temp_div = document.getElementById('files_button_foptions');
	temp_div.innerHTML=text;
	document.getElementById('files_button_enter').innerHTML='';
	//text = '<input type="button" class="buttons" value="txt file" onclick="alert();" style="width:32%"> ';
	text = '<form action="" class="buttons" method="post" style="width:32%"> <input type="text" name="file_name"><br> <input type="submit" value="button">';
	var temp_div = document.getElementById('files_button_prev');
	temp_div.innerHTML=text;
	document.getElementById('files_button_next').innerHTML='';
	}

function show_letters(n){
	//alert('hello');
	text = '<div style="left: 84%;	top: 8%; position:fixed;"> <form action="" method="post"> <input type="submit" value="edit" name="edit_word" class="buttons"> </div>';
	text = '<form action="" class="buttons" method="post" style="width:32%"> <input type="text" name="dir_name"><br> <input type="submit" value="button">';
	var temp_div = document.getElementById('input_area');
	//temp_div.innerHTML=text;
	//document.getElementById('files_button_enter').innerHTML='';
	}
