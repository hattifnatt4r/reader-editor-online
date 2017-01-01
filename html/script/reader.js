$.getScript("/script/common.js");

var session = localStorage.getItem('reader_session');
if (session!='started'){
	session = 'started';
	localStorage.setItem('reader_session', session);
	localStorage.setItem('reader_iter', '0');
	localStorage.setItem('reader_selecttype', '1');
	localStorage.setItem('reader_zoomtype', '2');
	localStorage.setItem('latest_w', 'p0s0w0');
	localStorage.setItem('latest_s', 'p0s0');
	localStorage.setItem('latest_p', 'p0');
	localStorage.setItem('reader_id_prev', 'p0s0w0');
	localStorage.setItem('reader_id_curr', 'p0s0w0');
	
	localStorage.setItem('text_origin', 'text_o');
	localStorage.setItem('text_parsed', 'text_p');
	localStorage.setItem('text_edit', '0test0');
	
	localStorage.setItem('editor_iter', '0');
	localStorage.setItem('editor_back', '/reader.html');
	
	localStorage.setItem('ischanged_text', '0');
	localStorage.setItem('reader_lang', 'ru');
	}

var bodyStyles = window.getComputedStyle(document.body);
//set_screen_pars();
	screen_height = window.screen.height+'px';
	screen_width = window.screen.width+'px';
	document.body.style.setProperty('--screen-height', screen_height);
	document.body.style.setProperty('--screen-width', screen_width);

reader_show_buttons();
var ischanged = localStorage.getItem('ischanged_text');
if (ischanged=='0'){
	text = document.getElementById('hidden_text').innerHTML;
	parser = reader_parse_text(text);
	text_parsed = parser[0]; 
	var word_id=parser[1]; 	var sentence_id=parser[2]; var paragraph_id=parser[3];
	document.getElementById('text_from_file').innerHTML = text_parsed;
	localStorage.setItem('text_origin', text);
	localStorage.setItem('text_parsed', text_parsed);
}else{
	text = localStorage.getItem('text_edit'); //alert('text_edit: '+text);
	text = replace_all(text, '<br>', ':nl:'); //alert('text_edit 2: '+text);
	
	text_parsed = localStorage.getItem('text_parsed'); //alert('text_parsed: '+text_parsed);
	document.getElementById('temp').innerHTML = text_parsed;
	id = localStorage.getItem('reader_id_curr'); //alert('id: '+id);
	document.getElementById(id).innerHTML = text;
	
	text_all_parsed = document.getElementById('temp').innerHTML; //alert('text_all_parsed '+text_all_parsed);
	text_all_origin = merge_text(text_all_parsed);
	localStorage.setItem('text_origin', text_all_origin);
	
	parser = reader_parse_text(text_all_origin); 
	text_parsed = parser[0]; 
	var word_id=parser[1]; 	var sentence_id=parser[2]; var paragraph_id=parser[3];
	document.getElementById('text_from_file').innerHTML = text_parsed;
	localStorage.setItem('text_parsed', text_parsed);
	
	localStorage.setItem('ischanged_text', '0');
	save_file();
}function save_file(){
	var text = localStorage.getItem('text_origin');
	document.getElementById('save_text_text_js').value = text; 
	document.getElementById('save_text_submit_js').click(); 
	}
reader_select_type(order=0);
reader_zoom_type(order=0);
//alert(document.getElementById('text_from_file').innerHTML);
 
function scrollbut_div(order){
	iter = JSON.parse(localStorage.getItem('reader_iter'));
	n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	id_arr = get_id_array();
	max_iter = id_arr.length;
	if (order==next) { if (iter < (max_iter)) { iter ++; } else { iter=max_iter; } }
	else if (order==prev) { if (iter > -1) { iter -= 1; } else { iter=-1; } } 
	if (iter==-1){ id='file_title'; } 
	else { id=id_arr[iter]; }
	localStorage.setItem('reader_iter', JSON.stringify(iter));
	localStorage.setItem('reader_id_curr', id); //alert(iter+' '+id);
	
	if (iter==-1){
		localStorage.setItem('latest_w', id); 
		localStorage.setItem('latest_s', id); 
		localStorage.setItem('latest_p', id); 
	}
	if ((order==next|| order==prev) && iter>-1){
		if (n_select_type==0){ 
			localStorage.setItem('latest_w', id); 
			localStorage.setItem('latest_s', id.substr(0,4)); 
			localStorage.setItem('latest_p', id.substr(0,2)); 
		}else if (n_select_type==1){ 
			localStorage.setItem('latest_w', id+'w0'); 
			localStorage.setItem('latest_s', id); 
			localStorage.setItem('latest_p', id.substr(0,2)); 
		}else if (n_select_type==2){ 
			localStorage.setItem('latest_w', id+'s0w0' );
			localStorage.setItem('latest_s', id+'s0' );
			localStorage.setItem('latest_p', id );
			}
	}
	
	//var name = document.getElementById(id).getAttribute("title");
	//if (id.charAt(1)=='i'){ tts('рисунок номер '+'1'); }
	//if (id.charAt(1)=='t'){ show_zoom(id); utter(id); }
	lang = localStorage.getItem('reader_lang');
	utter(document.getElementById(id).innerText, lang);  highlite();  zoom_set_text();  
	scroll_to(id,'text_from_file_box'); //alert('scroll');
	scroll_to(id,'reader_zoom_box',title=1); //alert('scroll');
	document.getElementById('word_i').value = document.getElementById(id).innerText; 
	
}	
function zoom_set_text(){
	n_zoom_type = JSON.parse(localStorage.getItem('reader_zoomtype'));
	if (n_zoom_type==1){
		text = document.getElementById(localStorage.getItem('latest_w')).innerHTML;
	}if (n_zoom_type==2){
		text = document.getElementById(localStorage.getItem('latest_s')).innerHTML;
		//text = replace_all(text, 'id=','title='); //alert('text: '+text);
	}
	elem=document.getElementById('reader_zoom');
	if (elem){elem.innerHTML=text; /*alert('set: '+elem.innerHTML);*/}
}
function highlite(){
	//alert(id_prev);
	id_prev = localStorage.getItem('reader_id_prev'); id = get_id()
	//document.getElementById(id_prev).style.color=null;
	document.getElementById(id_prev).className='text';
	var div = document.getElementById(id);
	//div.style.color='green';
	div.className='text_highlite';
	localStorage.setItem('reader_id_prev', id);
}


function get_id(){
	//alert('get_id()');
	iter = JSON.parse(localStorage.getItem('reader_iter'));
	id_arr = get_id_array();
	if (iter==-1){ latest_id='file_title'; }
	else{ latest_id = id_arr[iter]; }
	//alert('get_id() done');
	return(latest_id);
}function get_id_array(){
	//alert('get_id_array()');
	n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	if (n_select_type == 1){ id_arr=sentence_id; }	
	else if (n_select_type == 2){ id_arr=paragraph_id; }	
	else if (n_select_type == 0){ id_arr=word_id; }	
	//alert('get_id_array() done');
	return(id_arr);
}function get_id_backup(){
	//alert('get_id_backup()');
	n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	if (n_select_type == 0){ latest_id=localStorage.getItem('latest_w'); }	
	else if (n_select_type == 1){ latest_id=localStorage.getItem('latest_s'); }	
	else if (n_select_type == 2){ latest_id=localStorage.getItem('latest_p'); }	
	//alert('get_id_backup() done');
	return(latest_id);
}

function reader_select_type(order=0){
	n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	var types = ['select word','select sentence','select paragr'];
	if (order==1){
		n_select_type = (n_select_type+1)%3;
		localStorage.setItem('reader_selecttype', JSON.stringify(n_select_type));
		id_arr = get_id_array();  latest_id = get_id_backup();
		localStorage.setItem('reader_iter', id_arr.indexOf(latest_id).toString() );
	}
	highlite(); zoom_set_text();
	id=get_id(); localStorage.setItem('reader_id_curr', id); //alert('id: '+id);
	document.getElementById('reader_selecttype').innerHTML=types[n_select_type];
}
function reader_zoom_type(order=0){
	n_zoom_type = JSON.parse(localStorage.getItem('reader_zoomtype'));
	var types = ['no zoom', 'zoom word','zoom sentence'];
	if (order==1){
		n_zoom_type = (n_zoom_type+1)%3;	
		localStorage.setItem('reader_zoomtype', JSON.stringify(n_zoom_type));
	}
	textheight_zoom = bodyStyles.getPropertyValue('--reader-textheight-zoom'); 
	if (n_zoom_type==0){ 
		var elem = document.getElementById("reader_zoom_box");
		if (elem!=null){ elem.parentNode.removeChild(elem); }
		document.getElementById('text_from_file_box').style.height = bodyStyles.getPropertyValue('--reader-textheight');
	}else{
		var elem = document.getElementById("reader_zoom_box");
		if (elem!=null){ elem.parentNode.removeChild(elem); }
		var elem=create_element('div', 'reader_zoom_box','reader_zoom_box');
		inner_i = '<div id="reader_zoom" class="text_zoom">zoom word</div>';
		elem.innerHTML = inner_i;
		document.getElementById('text_from_file_box').style.height = textheight_zoom; //alert(textheight_zoom);
	}
	elem = document.getElementById('reader_menu_back');
	if (elem!=null){elem.click();}
	zoom_set_text();
	document.getElementById('reader_zoomtype').innerHTML=types[n_zoom_type];
}
	
//-- buttons -------------------------------------------------------------------------

function reader_show_buttons(){
	var elem=create_element('div', 'reader_buttons_area', 'buttons_area');
	inner_e = '<div id="reader_menu" class="buttons" onclick="show_reader_menu();"  style="'+reader_button_position(0)+'">menu</div>' ;
	inner_e+= '<div id="reader_zoomtype" class="buttons" onclick="reader_zoom_type(1);"  style="'+reader_button_position(1)+'">zoom</div>' ;
	inner_e+= '<div id="reader_selecttype" class="buttons" onclick="reader_select_type(1);"  style="'+reader_button_position(2)+'">word</div>' ;
	inner_e+= '<div id="prev" class="buttons" onclick="scrollbut_div(prev);"  style="'+reader_button_position(3)+'">'+symbol_prev+'</div>' ;
	inner_e+= '<div id="next" class="buttons" onclick="scrollbut_div(next);"  style="'+reader_button_position(4)+'">'+symbol_next+'</div>' ;
	elem.innerHTML=inner_e;
	}
function show_reader_menu(){
	iter = JSON.parse(localStorage.getItem('reader_iter'));
	if (iter==-1){ edit_function = ''; edit_class='buttons disabled'; }
	else { edit_function='onclick="reader_editor(reader_edit);"'; edit_class='buttons'; }
	
	var elem=create_element('div', 'reader_menu_area', '');
	var inner_e = '<div id="reader_menu_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="reader_menu_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,1);">';
	inner_e+= '<div id="reader_menu_appearance"        class="buttons disabled" onclick=""   style="left:15%; top:15%;">appearance</div>';
	//inner_e+= '<div id="reader_menu_appearance-common" class="buttons disabled" onclick=""   style="left:35%; top:15%;">appearance-common</div>';
	inner_e+= '<div id="reader_menu_sound"             class="buttons disabled" onclick=""   style="left:15%; top:50%;">sound</div>';
	inner_e+= '<div id="reader_menu_lang"              class="buttons"          onclick="reader_change_lang()"   style="left:35%; top:50%;">lang ru</div>';
	inner_e+= '<div id="reader_go"                     class="buttons disabled" onclick=""   style="left:70%;top:50%;">go</div>' ;
	inner_e+= '<div id="reader_menu_go-files"  class="buttons" onclick="goto_files();"                style="left:50%; top:15%;">go home</div>';
	inner_e+= '<div id="reader_edit"           class="'+edit_class+'" '+edit_function+'  style="left:70%;top:15%;">edit</div>' ;
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
	menu_blur();
}function show_menu_appearance_common(element_id='reader_menu_area'){
	e = document.getElementById(element_id)
	var inner_e = '<input id="reader_menu_appearance-common_reset" type="button" class="buttons" value="reset" onclick="alert(123);" style="left:15%; top:15%; position:fixed; width:14%;">';
	inner_e += '<input id="reader_menu_appearance-common_buttonsize" type="button" class="buttons" value="buttonsize" onclick="alert(123);" style="left:35%; top:15%; position:fixed; width:14%;">';
	e.innerHTML = inner_e;
}
function show_menu_go(element_id='reader_menu_area'){
	var elem=create_element('div', 'reader_go_area', '');
	var inner_e = '<div id="reader_menu_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="reader_go_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,0.9);">';
	inner_e+= '<input id="reader_menu_go_file1" type="button" class="buttons" value="file1" onclick="goto_files();" style="left:35%; top:15%; position:fixed; width:14%;">';
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
	}
function goto_files(){ window.location.href = '/index.html'; }
	
function reader_change_lang(){
	lang = localStorage.getItem('reader_lang');
	if (lang=='ru'){lang_new='en';} else{lang_new='ru';}
	localStorage.setItem('reader_lang', lang_new);
	document.getElementById('reader_menu_lang').innerHTML = 'lang '+lang_new;
	//document.getElementById('reader_menu_back').click();
	}
function reader_editor(){
	text_all = document.getElementById('text_from_file').innerHTML;
	localStorage.setItem('text_parsed', text_all);
	//alert(123);
	id = get_id();
	text = document.getElementById(id).innerHTML;
	text_plane = merge_text(text);
	text_plane = replace_all(text_plane, ':nl:', '<br>');
	localStorage.setItem('text_edit', text_plane);
	localStorage.setItem('editor_iter', '0');
	localStorage.setItem('editor_back', '/reader.html');
	window.location.href = '/editor.html';
}
