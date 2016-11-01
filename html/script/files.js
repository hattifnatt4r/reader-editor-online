//alert('scroll_test');

var session = localStorage.getItem('session');
if (session!='started'){
	session = 'started';
	localStorage.setItem('session', session);
	localStorage.setItem('file_iter', JSON.stringify(0));
	}

//alert('scroll_test');
function scroll_files(order){
	alert('scroll');
	var file_iter = JSON.parse(localStorage.getItem('file_iter'));
	if (order==next){
		file_iter+=1;}
	if (order==prev){ if (file_iter>0) {file_iter-=1;} }
	localStorage.setItem('file_iter', JSON.stringify(file_iter));
	document.getElementById('files_hidden_iter').innerHTML=file_iter;
	}

//---------------------------------------------------------------------------
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
	
