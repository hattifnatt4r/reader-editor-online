$.getScript("/script/common.js");
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
//set_screen_pars();
var bodyStyles = window.getComputedStyle(document.body);
screen_height = window.screen.height+'px';
screen_width = window.screen.width+'px';
document.body.style.setProperty('--screen-height', screen_height);
document.body.style.setProperty('--screen-width', screen_width);

var files_iter = JSON.parse(localStorage.getItem('files_iter'));
var files_iter_prev = JSON.parse(localStorage.getItem('files_iter_prev'));
var nentry = document.getElementById('hidden_files_nentry').innerHTML;
//scroll_files(0);
files_show_buttons();

localStorage.setItem('editor_back', '/index.html');
var if_i=localStorage.getItem('if_create_file');
if (if_i=='1'){
	//alert('create');
	document.getElementById('files_menu').click(); 
	document.getElementById('files_create').click(); 
	text = localStorage.getItem('text_edit');
	document.getElementById('files_create_zoom').innerHTML = text; 
	document.getElementById('files_name_text').value = text;
	//alert('set value'); 
	localStorage.setItem('if_create_file', '0');
	iter = JSON.parse(localStorage.getItem('files_iter'));
	if (iter>0){iter-=1; localStorage.setItem('files_iter', iter);}
}
var if_i=localStorage.getItem('if_rename_file');
if (if_i=='1'){
	//alert('rename');
	//localStorage.setItem('if_rename_file', '0');
	document.getElementById('files_button_options').click(); 
	text = localStorage.getItem('text_edit');
	elem=document.getElementById('files_options_zoom');
	//alert(elem); 
	document.getElementById('files_options_zoom').innerHTML = text; 
	//alert('click');
	document.getElementById('files_options_text').value = text;
	document.getElementById('files_options_n').value = localStorage.getItem('files_iter');
	//alert('set value'); 
	//localStorage.setItem('if_rename_file', '0');
}
files_fill_zoom();
function files_fill_zoom(){
	files_iter = JSON.parse(localStorage.getItem('files_iter'));
	dir0 = document.getElementById('hidden_files_dir').innerHTML; 
	i = dir0.indexOf('/');
	if (i!=-1) { dir = dir0.substr(i); } else{dir = ''}
	dir = '<em style="font-style:normal;color:#008000;opacity:0.6;">'+dir+' / </em>';
	//dir = '<em style="font-style:normal;color:#663300;opacity:0.5;">'+dir+' / </em>';
	//dir = '<em style="font-style:normal;color:#9fa6ad;opacity:1;">'+dir+' / </em>';
	//dir = '<em style="font-style:normal;color:#8a8a5c;opacity:0.9;">'+dir+' / </em>';
	document.getElementById('files_zoom').innerHTML = dir+document.getElementById('fileid_'+files_iter.toString()).innerHTML; 
	
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
	document.getElementById('hidden_file_iter').innerHTML=files_iter;
	document.getElementById('file_n').value = files_iter; 
	files_fill_zoom();
	
	var fileid = 'fileid_'+files_iter.toString();  scroll_to(fileid, 'files_area_box');
	
	title=elem.getAttribute('title');
	if (title=='dir'){fclass='files-dir-hover';} else{fclass='files-txt-hover';}  elem.className = 'files '+fclass; 
	if (files_iter!=files_iter_prev){
		var fileid = 'fileid_'+files_iter_prev.toString();
		elem = document.getElementById(fileid); title=elem.getAttribute('title'); 
		if (title=='dir'){fclass='files-dir';} else{fclass='files-txt';}  elem.className = 'files '+fclass; 
		}
	}

//-- show buttons ---------------------------------------------------------------------------
function files_show_buttons(){
	var elem=create_element('div', 'files_buttons_area', 'buttons_area');
	inner_e = '<div id="files_menu" class="buttons" onclick="files_show_menu();"  style="'+reader_button_position(0)+'">menu</div>' ;
	inner_e+= '<div id="files_button_options" class="buttons" onclick="files_show_options();"  style="'+reader_button_position(1)+'">options</div>';
	
	inner_e+= '<div id="files_button_enter" style="left:84%;top:53%;position:fixed;">'; 
	inner_e+= '<form action="" method="post">  <input type="text" id="file_n" name="file_n" value="Mouse" style="width:0%;height:0%;">';
	inner_e+= '<input hidden type="submit" id="files_enter_hidden" value="enter" name="enter_obj" "></div>';
	inner_e+= '<div id="files_enter" class="buttons" style="'+reader_button_position(2)+'" onclick="files_click(0);">'+symbol_enter+'</div></div>';
	
	inner_e+= '<div id="prev" class="buttons" onclick="scroll_files(prev);"  style="'+reader_button_position(3)+'">'+symbol_prev+'</div>' ;
	inner_e+= '<div id="next" class="buttons" onclick="scroll_files(next);"  style="'+reader_button_position(4)+'">'+symbol_next+'</div>' ;
	elem.innerHTML=inner_e;
	}
function files_click(n){ 
	var arr_names = ["files_enter_hidden", "files_delete_hidden", "files_edit_hidden", 'files_createdir_hidden', 'files_createtxt_hidden'];
	document.getElementById(arr_names[n]).click();  }
function files_show_options(){
	//alert('show_options');
	menu_blur();
	iter = localStorage.getItem('files_iter');
	//alert('fileid_'+iter.toString());
	var if_i=localStorage.getItem('if_rename_file');
	if (if_i=='1'){fname = localStorage.getItem('text_edit'); localStorage.setItem('if_rename_file', '0'); }
	else { fname = document.getElementById('fileid_'+iter.toString()).innerHTML; }
	//alert(fname);
	//fname = '332211';
	localStorage.setItem('text_edit', fname);
	var elem=create_element('div', 'files_options_area', '');
	var inner_e = '<div id="files_options_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="files_options_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,1);">';
	
	inner_e+= '<div id="files_options_zoom_box" class="reader_zoom_box" style="left:15%;top:15%;width:63%;border:solid 1px white;"><div id="files_options_zoom" class="text_zoom">'+fname+'</div></div>';
	inner_e+= '<div id="files_options_edit-name" class="buttons" onclick="files_options_edit();" style="left:40%; top:45%;">edit name</div>';
	
	inner_e+= '<div id="files_options_form" style="left:13%;top:45%:width:20%;position:fixed;"> ';
	inner_e+= '<form action="" method="post">';
	inner_e+= '<input type="text" id="files_options_n" name="files_options_n" value="'+iter.toString()+'" style="width:0%;height:0%;">';
	inner_e+= '<input type="text" id="files_options_text" name="files_options_text" value="'+fname+'" style="width:0%;height:0%;">';
	inner_e+= '<input hidden id="files_delete_hidden" type="submit" value="delete" name="files_options_submit">'; 
	inner_e+= '<input hidden id="files_edit_hidden"   type="submit" value="edit"   name="files_options_submit"></div>';
	inner_e+= '<div class="buttons" onclick="files_click(1);" style="left:13%;top:45%;">delete</div>';
	inner_e+= '<div class="buttons" onclick="files_click(2);" style="left:70%;top:45%;">edit</div>';
	inner_e+= '</div>';
		
	elem.innerHTML = inner_e;
	}
function files_options_edit(){
	//alert('options_edit');
	//localStorage.setItem('text_edit', text);
	fname = localStorage.getItem('text_edit'); 
	if (fname!='trash'){
		localStorage.setItem('editor_iter', '0');
		localStorage.setItem('if_rename_file', '1');
		//alert('set create file');
		localStorage.setItem('editor_back', '/index.html');
		//alert('set editor back');
		window.location.href = '/editor.html';
	}
	}

function files_show_menu(){
	var elem=create_element('div', 'files_menu_area', '');
	var inner_e = '<div id="files_menu_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	
	inner_e+= '<div id="files_menu_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,0.9);">';
	inner_e+= '<div id="files_appearance" class="buttons" onclick="alert(123);" style="left:15%; top:15%;">appearance</div>';
	inner_e+= '<div id="files_appearance-common" class="buttons" onclick="show_menu_appearance_common();" style="left:35%; top:15%;">appearance-common</div>';
	inner_e+= '<div id="files_sound" class="buttons" onclick="alert(123);" style="left:15%; top:50%;">sound</div>';
	
	inner_e+= '<div id="files_create" class="buttons" onclick="files_show_create();" style="left:60%; top:50%;">new file</div>';
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
	menu_blur();
	}
function files_show_create(){
	var elem=create_element('div', 'files_create_area', '');
	var inner_e = '<div id="files_create_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="files_create_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,1);">';
	
	//inner_e+= '<div id="files_create_zoom" class="text_zoom" style="left:15%;top:15%;width:63%;"> file </div>';
	inner_e+= '<div id="files_create_zoom_box" class="reader_zoom_box" style="left:15%;top:15%;width:63%;border:solid 1px white;"><div id="files_create_zoom" class="text_zoom">file</div></div>';
	inner_e+= '<div id="files_edit-name" class="buttons" onclick="files_create_edit(123);" style="left:40%; top:45%;">edit name</div>';
	
	inner_e+= '<div id="files_create_form" style="left:13%;top:45%:width:20%;position:fixed;"> ';
	inner_e+= '<form action="" method="post">  <input type="text" id="files_name_text" name="files_name_text" value="file" style="width:0%;height:0%;">';
	inner_e+= '<input hidden id="files_createtxt_hidden" type="submit" value="create file" name="files_create_submit" >';
	inner_e+= '<input hidden id="files_createdir_hidden" type="submit" value="create dir"  name="files_create_submit"></div>';
	inner_e+= '<div class="buttons" onclick="files_click(4)" style="left:13%;top:45%;">create file</div>';
	inner_e+= '<div class="buttons" onclick="files_click(3)" style="left:70%;top:45%;">create dir </div>';
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
	}

function files_create_edit(text){
	localStorage.setItem('text_edit', text);
	localStorage.setItem('editor_iter', '0');
	localStorage.setItem('if_create_file', '1');
	//alert('set create file');
	localStorage.setItem('editor_back', '/index.html');
	//alert('set editor back');
	window.location.href = '/editor.html';
	}
	
