
//alert('scroll_test');
var files_session = localStorage.getItem('files_session');
if (files_session!='started'){
	files_session = 'started';
	localStorage.setItem('files_session', files_session);
	localStorage.setItem('files_iter', '0');
	localStorage.setItem('files_iter_prev', '0');
	
	localStorage.setItem('editor_iter', '0');
	localStorage.setItem('editor_back', '/index.html');
	localStorage.setItem('if_create_file', '0');
	localStorage.setItem('if_rename_file', '0');
	}
var files_iter = JSON.parse(localStorage.getItem('files_iter'));
var files_iter_prev = JSON.parse(localStorage.getItem('files_iter_prev'));
var nentry = document.getElementById('hidden_files_nentry').innerHTML;
//scroll_files(0);

localStorage.setItem('editor_back', '/index.html');
var if_i=localStorage.getItem('if_create_file');
if (if_i=='1'){
	document.getElementById('files_menu').click(); 
	document.getElementById('files_create').click(); 
	text = localStorage.getItem('text_edit');
	document.getElementById('files_create_zoom').innerHTML = text; 
	document.getElementById('files_name_text').value = text;
	//alert('set value'); 
	localStorage.setItem('if_create_file', '0');
	localStorage.setItem('files_iter', '0');
}

//alert('scroll_test');
function scroll_files(order){
	files_iter = JSON.parse(localStorage.getItem('files_iter'));
	files_iter_prev = JSON.parse(localStorage.getItem('files_iter_prev'));
	if (order==next){ if (files_iter<nentry) {files_iter+=1;} }
	else if (order==prev){ if (files_iter>0) {files_iter-=1;} }
	else ( files_iter = order );
	localStorage.setItem('files_iter_prev', JSON.stringify(files_iter));
	//files_iter+=1;
	localStorage.setItem('files_iter', JSON.stringify(files_iter));
	//document.getElementById('hidden_file_iter').innerHTML='iter:'+JSON.stringify(files_iter);
	document.getElementById('file_n').value = files_iter; 
	
	var fileid = 'fileid_'+files_iter.toString();
	document.getElementById(fileid).className = 'buttons_hover'; 
	if (files_iter!=files_iter_prev){
		var fileid = 'fileid_'+files_iter_prev.toString();
		document.getElementById(fileid).className = 'buttons';  }
	//alert(fileid);
	}

function files_show_menu(){
	//alert('menu');
	//var e2=create_element('div', 'reader_menu_area', 'buttons', 'width:80%; height:86%; left:10%; top:7%;background-color: rgba(255,255,255,0.9);');
	var elem=create_element('div', 'files_menu_area', '');
	var inner_e = '<div id="files_menu_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	
	inner_e+= '<div id="files_menu_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,0.9);">';
	inner_e+= '<div id="files_appearance" class="buttons" onclick="alert(123);" style="left:15%; top:15%;">appearance</v>';
	inner_e+= '<div id="files_appearance-common" class="buttons" onclick="show_menu_appearance_common();" style="left:35%; top:15%;">appearance-common</div>';
	inner_e+= '<div id="files_sound" class="buttons" onclick="alert(123);" style="left:15%; top:50%;">sound</div>';
	
	inner_e+= '<div id="files_create" class="buttons" onclick="files_create();" style="left:60%; top:50%;">new file</div>';
		
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
	}
function files_create(){
	var elem=create_element('div', 'files_create_area', '');
	var inner_e = '<div id="files_create_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="files_create_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,0.9);">';
	
	inner_e+= '<div id="files_create_zoom" class="text_zoom" style="left:15%;top:15%;width:63%;"> file </div>';
	inner_e+= '<div id="files_edit-name" class="buttons" onclick="files_create_edit(123);" style="left:40%; top:45%;">edit name</div>';
	
	inner_e+= '<div id="files_create-file" style="left:13%;top:45%:width:20%;position:fixed;"> ';
	inner_e+= '<form action="" method="post">  <input type="text" id="files_name_text" name="files_name_text" value="file" style="width:0%;height:0%;">';
	inner_e+= '<input type="submit" value="create file" name="files_create_submit" class="buttons" style="left:13%;top:45%;">';
	inner_e+= '<input type="submit" value="create dir" name="files_create_submit" class="buttons" style="left:70%;top:45%;"></div>';
	

	
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
	}

function files_create_edit(text){
	//text = '';
	//text='12345';
	localStorage.setItem('text_edit', text);
	localStorage.setItem('editor_iter', '0');
	localStorage.setItem('if_create_file', '1');
	//alert('set create file');
	localStorage.setItem('editor_back', '/index.html');
	//alert('set editor back');
	window.location.href = '/editor.html';
	}
	
//---------------------------------------------------------------------------
/*
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
	*/

